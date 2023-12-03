import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {UpdateRegistryScreenProps} from './UpdateRegistryScreen.types';
import {DateInput, FeeContent, Footer, Header} from '../../../components';
import {styles} from './UpdateRegistryScreen.styled';
import {useFormik} from 'formik';
import {IFee, IFormData} from '../../../types';
import {
  converLicensePlate,
  convertDate,
  convertPrice,
  formatDate,
} from '../../../utils/string';
import {colors} from '../../../constants';
import {UpdateRegistrySchema} from '../../../services/validators';
import {useDispatch, useSelector} from 'react-redux';
import {clearPosition, geoSelector, setCurrentPosition} from '../../../redux';
import {RegistryApi} from '../../../services/api';
import Toast from 'react-native-toast-message';

const UpdateRegistryScreen: FC<UpdateRegistryScreenProps> = ({
  navigation,
  route,
}) => {
  const {data} = route.params;
  const dispatch = useDispatch();
  const {history, position} = useSelector(geoSelector);

  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [feeList, setFeeList] = useState<IFee>(data.fee);

  const handleGetCost = useCallback(
    async (address?: string, distance?: number) => {
      try {
        setIsLoading(true);
        const res = await RegistryApi.getCostRegistry({
          carId: data.carId.toString(),
          address: address,
          distance: distance,
        });
        if (res.status === 1) {
          setFeeList(res.data.fee);
        } else {
          //@ts-ignore
          throw new Error(res.message);
        }
      } catch (error: any) {
        console.log(error.message);
        Toast.show({
          type: 'error',
          text1: 'Có lỗi xảy ra',
          text2: error.message || 'Vui lòng thử lại sau',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [data.carId],
  );

  const handleSubmit = useCallback(async (formData: IFormData) => {
    if (formData.check === true && formData.address === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn địa chỉ!');
    } else if (feeList) {
      try {
        setLoadingSubmit(true);
        let dataSend: any = {
          carId: data.carId,
          date: convertDate(formData.date),
          registry_time: formData.time,
          license_fee: feeList.license_fee,
          road_fee: feeList.road_fee,
          tariff: feeList.tariff,
        };
        console.log(data);

        if (formData.check)
          dataSend = {
            ...dataSend,
            address: formData.address,
            serviceCost: feeList.serviceCost,
          };
        const res = await RegistryApi.updateRegistration(dataSend, data.id);

        if (res.status === 1) {
          dispatch(clearPosition());
          Toast.show({
            type: 'success',
            text1: 'Chỉnh sửa thành công!',
          });
          navigation.reset({
            index: 1,
            routes: [
              {
                name: 'Bottom',
              },
              {
                name: 'RegistriesList',
              },
            ],
          });
        } else {
          //@ts-ignore
          throw new Error(res.message);
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Chỉnh sửa không thành công!',
          text2: error.message || 'Vui lòng thử lại.',
        });
      } finally {
        setLoadingSubmit(false);
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      address: data.address || '',
      check: data.address ? true : false,
      date: formatDate(data.date),
      time: data.registry_time?.slice(0, 5) || '',
    },
    validationSchema: UpdateRegistrySchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    dispatch(clearPosition());
  }, []);

  const renderFeeDistance = useMemo(() => {
    if (formik.values.check) {
      if (position) {
        return (
          <FeeContent
            title="Phí đăng kiểm hộ"
            price={
              convertPrice(feeList?.serviceCost) +
              ' đ' +
              (position.distance ? '/' + position.distance.text : '')
            }
          />
        );
      }
      return (
        <FeeContent
          title="Phí đăng kiểm hộ"
          price={`${convertPrice(feeList?.serviceCost)} đ`}
        />
      );
    }
  }, [formik.values.check, position, feeList.serviceCost]);

  useEffect(() => {
    if (position && position.description) {
      formik.setFieldValue('address', position.description);
      if (position.distance) {
        handleGetCost(position.description, position.distance.value / 1000);
      }
    }
  }, [position]);

  return (
    <View style={{flex: 1}}>
      <Header title="Chỉnh sửa đăng ký đăng kiểm" />
      <ScrollView style={styles.scroll_view}>
        <View style={styles.session_top}>
          <View style={styles.group}>
            <Text style={styles.group_title}>Xe đăng ký</Text>
            <Text style={styles.group_content}>
              {converLicensePlate(data.license_plate)}
            </Text>
          </View>
          <View style={styles.dateItemWrapper}>
            <View style={styles.input_picker}>
              <DateInput
                date={formik.values.date}
                label="Ngày đăng ký"
                onChangeDate={date => {
                  formik.setFieldValue('date', date);
                }}
                onBlur={formik.handleBlur('date')}
              />
              <View style={styles.error_message}>
                <Text style={{color: colors.RED}}>{formik.errors.date}</Text>
              </View>
            </View>
            <View style={styles.input_picker}>
              <DateInput
                date={formik.values.time}
                label="Giờ đăng ký"
                onChangeDate={time => {
                  formik.setFieldValue('time', time);
                }}
                placeholder="hh:mm"
                option={{
                  format: 'hh:mm',
                }}
                onBlur={formik.handleBlur('time')}
              />
              <View style={styles.error_message}>
                <Text style={{color: colors.RED}}>{formik.errors.time}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.session_bottom}>
          <TouchableOpacity
            style={styles.check}
            onPress={() => {
              formik.setFieldValue('check', !formik.values.check);
              setOpen(false);
            }}>
            <View
              style={[
                styles.check_box,
                {
                  backgroundColor: formik.values.check ? '#06B217' : '#FFFFFF',
                },
              ]}>
              <Image
                source={require('../../../assets/icons/check_icon.png')}
                style={{
                  width: 14,
                  height: 10.5,
                }}
              />
            </View>
            <Text style={styles.check_box_text}>
              Nhờ nhân viên đi đăng kiểm hộ
            </Text>
          </TouchableOpacity>
          {formik.values.check && (
            <View style={[styles.text_input, {zIndex: 1}]}>
              <View>
                <Text style={styles.label_style}>Địa chỉ nhận xe</Text>
                <TextInput
                  value={formik.values.address}
                  style={styles.input_style}
                  placeholder="Nhập"
                  placeholderTextColor={'#757F8E'}
                  onPressIn={() => {
                    setOpen(true);
                  }}
                />
                <TouchableOpacity
                  style={styles.icon_position}
                  onPress={() => {
                    navigation.push('Map');
                  }}>
                  <Image
                    source={require('../../../assets/icons/map_icon.png')}
                    style={styles.icon_style}
                  />
                </TouchableOpacity>
                <Modal
                  visible={open}
                  style={styles.drop_down}
                  animationType="slide">
                  <View style={styles.headerModalWrapper}>
                    <Text style={styles.textStyled}>Chọn địa chỉ</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setOpen(false);
                      }}>
                      <Image
                        source={require('../../../assets/icons/close-icon.png')}
                        style={{
                          width: 16,
                          height: 16,
                          tintColor: colors.DARKER_BLUE,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView style={{flex: 1}}>
                    {history.length === 0 && (
                      <Text
                        style={[styles.textStyled, {paddingHorizontal: 15}]}>
                        Bạn chưa từng chọn địa chỉ nào cả
                      </Text>
                    )}
                    {history.map((prediction, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(setCurrentPosition(prediction));
                          setOpen(false);
                        }}
                        key={index}>
                        <Text style={styles.drop_text}>
                          {prediction.description}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Modal>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={{color: colors.RED}}>{formik.errors.address}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.fee_group}>
          <FeeContent
            title="Phí kiểm định xe cơ giới"
            price={convertPrice(feeList?.tariff) + ' đ'}
          />
          {renderFeeDistance}
          <FeeContent
            title="Phí cấp giấy chứng nhận kiểm định"
            price={`${convertPrice(feeList?.license_fee)} đ`}
          />
          <FeeContent
            title="Phí đường bộ/tháng"
            price={`${convertPrice(feeList?.road_fee)} đ`}
          />
        </View>
        <View style={{paddingHorizontal: 15}}>
          <View style={styles.note}>
            <Text style={styles.note_title}>Lưu ý:</Text>
            <Text style={styles.note_content}>
              Tổng cộng dự kiến chỉ là số liệu tham khảo. Số tiền thực tế có thể
              sẽ thay đổi tùy thuộc vào thời gian thanh toán Phí bảo trì đường
              bộ
            </Text>
          </View>
        </View>
      </ScrollView>
      <Footer
        buttonOkContent="LƯU"
        onClickButtonOk={formik.handleSubmit}
        style={{
          backgroundColor: '#FFFFFF',
        }}
        loading={loadingSubmit}
        disabled={loadingSubmit}
      />
    </View>
  );
};

export default UpdateRegistryScreen;

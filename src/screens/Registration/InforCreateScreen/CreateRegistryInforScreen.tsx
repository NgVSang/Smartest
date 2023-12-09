/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {CreateRegistryInforScreenProps} from './CreateRegistryInforScreen.types';
import {FeeContent, Footer, Header} from '../../../components';
import {styles} from './CreateRegistryInforScreen.styled';
import {useFormik} from 'formik';
import {IFee, IFormData} from '../../../types';
import {convertDate, convertPrice} from '../../../utils/string';
import {RegistryApi} from '../../../services/api';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {clearPosition, geoSelector, setCurrentPosition} from '../../../redux';
import {colors} from '../../../constants';
import {RegistryInfoSchema} from '../../../services/validators';

const CreateRegistryInforScreen: FC<CreateRegistryInforScreenProps> = ({
  navigation,
  route,
}) => {
  const {car, date, time} = route.params;
  const dispatch = useDispatch();
  const {history, position} = useSelector(geoSelector);

  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [feeList, setFeeList] = useState<IFee>();
  const [open, setOpen] = useState(false);

  const handleGetCost = useCallback(
    async (address?: string, distance?: number) => {
      try {
        setIsLoading(true);
        setFeeList(undefined);
        const res = await RegistryApi.getCostRegistry({
          carId: car.id,
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
    [car],
  );

  useEffect(() => {
    handleGetCost();
    dispatch(clearPosition());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      if (data.check === true && data.address === '') {
        Alert.alert('Thông báo', 'Vui lòng chọn địa chỉ!');
      } else if (feeList) {
        try {
          setLoadingSubmit(true);
          let dataSend: any = {
            carId: car.id,
            date: convertDate(date),
            registry_time: time,
            license_fee: feeList.license_fee,
            road_fee: feeList.road_fee,
            tariff: feeList.tariff,
          };
          if (data.check) {
            dataSend = {
              ...dataSend,
              address: data.address,
              serviceCost: feeList.serviceCost,
            };
          }
          const res = await RegistryApi.registerForRegistration(dataSend);
          if (res.status === 1) {
            dispatch(clearPosition());
            Toast.show({
              type: 'success',
              text1: 'Đăng ký thành công!',
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
            text1: 'Đăng ký không thành công!',
            text2: error.message || 'Vui lòng thử lại.',
          });
        } finally {
          setLoadingSubmit(false);
        }
      }
    },
    [feeList, car.id, date, time, dispatch, navigation],
  );

  const formik = useFormik({
    initialValues: {
      check: false,
      address: '',
    },
    onSubmit: handleSubmit,
    validationSchema: RegistryInfoSchema,
  });

  useEffect(() => {
    if (position && position.description) {
      formik.setFieldValue('address', position.description);
      if (position.distance) {
        handleGetCost(position.description, position.distance.value / 1000);
      }
    } else {
      formik.setFieldValue('address', '');
      handleGetCost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return (
    <View style={{flex: 1}}>
      <Header title="Đăng ký đăng kiểm" />
      <ScrollView
        style={styles.scroll_view}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetCost} />
        }>
        <View style={styles.input_group}>
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
                  // onChangeText={text => {
                  //   formik.setFieldValue('address', text);
                  // }}
                  style={styles.input_style}
                  placeholder="Chọn"
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
          {formik.values.check && position && (
            <FeeContent
              title="Phí đăng kiểm hộ"
              price={
                convertPrice(feeList?.serviceCost) +
                ' đ' +
                (position.distance ? '/' + position.distance.text : '')
              }
            />
          )}
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
        buttonOkContent="GỬI"
        onClickButtonOk={formik.handleSubmit}
        buttonCancelContent="HỦY"
        style={styles.footer_style}
        loading={loadingSubmit}
        disabled={loadingSubmit || isLoading}
      />
    </View>
  );
};

export default CreateRegistryInforScreen;

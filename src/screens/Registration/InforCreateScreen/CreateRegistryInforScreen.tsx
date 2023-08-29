import {
  Image,
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
import {Field, FieldProps, Formik} from 'formik';
import {IFee, IFormData} from '../../../types';
import {convertDate, convertPrice} from '../../../utils/string';
import {RegistryApi} from '../../../services/api';
import Toast from 'react-native-toast-message';

const CreateRegistryInforScreen: FC<CreateRegistryInforScreenProps> = ({
  navigation,
  route,
}) => {
  const {car, date, time} = route.params;

  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [feeList, setFeeList] = useState<IFee>();

  const handleGetCost = useCallback(async () => {
    try {
      setIsLoading(true);
      setFeeList(undefined);
      const res = await RegistryApi.getCostRegistry({
        carId: car.id,
        // address: '',
        // distance: 0,
      });
      if (res.status === 1) {
        setFeeList(res.data.fee);
      } else {
        //@ts-ignore
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [car]);

  useEffect(() => {
    handleGetCost();
  }, []);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      if (feeList) {
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
          if (data.check)
            dataSend = {
              ...dataSend,
              address: data.address,
              serviceCost: feeList.serviceCost,
            };
          const res = await RegistryApi.registerForRegistration(dataSend);
          if (res.status === 1) {
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
    [car, date, time, feeList],
  );

  return (
    <View style={{flex: 1}}>
      <Header title="Đăng ký đăng kiểm" />
      <Formik
        initialValues={{
          check: false,
          address: '',
        }}
        onSubmit={handleSubmit}>
        {({handleSubmit, setValues, values}) => (
          <>
            <ScrollView
              style={styles.scroll_view}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={handleGetCost}
                />
              }>
              <View style={styles.input_group}>
                <Field name="check">
                  {({field, form}: FieldProps<boolean>) => (
                    <TouchableOpacity
                      style={styles.check}
                      onPress={() => {
                        form.setFieldValue(field.name, !field.value);
                      }}>
                      <View
                        style={[
                          styles.check_box,
                          {
                            backgroundColor: field.value
                              ? '#06B217'
                              : '#FFFFFF',
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
                  )}
                </Field>
                {values.check && (
                  <Field name="address">
                    {({field, form}: FieldProps<string>) => (
                      <View style={[styles.text_input]}>
                        <Text style={styles.label_style}>Địa chỉ nhận xe</Text>
                        <TextInput
                          value={field.value}
                          onChangeText={field.onChange(field.name)}
                          style={styles.input_style}
                          placeholder="Nhập"
                          placeholderTextColor={'#757F8E'}
                        />
                        <TouchableOpacity style={styles.icon_position}>
                          <Image
                            source={require('../../../assets/icons/map_icon.png')}
                            style={styles.icon_style}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </Field>
                )}
              </View>
              <View style={styles.fee_group}>
                <FeeContent
                  title="Phí kiểm định xe cơ giới"
                  price={convertPrice(feeList?.tariff) + ' đ'}
                />
                {/* {values.check && (
                  <FeeContent
                    title="Phí đăng kiểm hộ"
                    price={
                      convertPrice(feeList?.serviceCost) +
                      ' đ' +
                      (distance ? '/' + distance?.distance.text : '')
                    }
                  />
                )} */}
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
                    Tổng cộng dự kiến chỉ là số liệu tham khảo. Số tiền thực tế
                    có thể sẽ thay đổi tùy thuộc vào thời gian thanh toán Phí
                    bảo trì đường bộ
                  </Text>
                </View>
              </View>
            </ScrollView>
            <Footer
              buttonOkContent="GỬI"
              onClickButtonOk={handleSubmit}
              buttonCancelContent="HỦY"
              style={styles.footer_style}
              loading={loadingSubmit}
              disabled={loadingSubmit || isLoading}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateRegistryInforScreen;

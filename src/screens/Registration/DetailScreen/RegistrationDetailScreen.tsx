import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {RegistrationDetailScreenProps} from './RegistrationDetailScreen.types';
import {FeeContent, Footer, Header} from '../../../components';
import {styles} from './RegistrationDetailScreen.styled';
import {IRegistrationDetail} from '../../../types';
import {RegistryApi} from '../../../services/api';
import {
  converLicensePlate,
  convertPrice,
  formatDate,
} from '../../../utils/string';
import Toast from 'react-native-toast-message';

const RegistrationDetailScreen: FC<RegistrationDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {id} = route.params;
  const [data, setData] = useState<IRegistrationDetail>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await RegistryApi.getRegitryDetail(id);
      if (res.status === 1) {
        setData(res.data);
      } else {
        //@ts-ignore
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleDelete = useCallback(() => {
    Alert.alert('Xóa đăng kiểm', 'Bạn có chắc muốn xóa đăng kiểm này không?', [
      {
        text: 'Hủy',
      },
      {
        text: 'Ok',
        onPress: async () => {
          try {
            setLoadingSubmit(true);
            const res = await RegistryApi.deleteRegistration(id);
            if (res.status === 1) {
              Toast.show({
                type: 'success',
                text1: 'Xóa đăng kiểm thành công',
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
            console.log(error.message);
            Toast.show({
              type: 'error',
              text1: 'Xóa không thành công',
              text2: error.message || 'Vui lòng thử lại ',
            });
          } finally {
            setLoadingSubmit(false);
          }
        },
      },
    ]);
  }, [id]);

  return (
    <View style={{flex: 1}}>
      <Header title="Chi tiết đăng ký đăng kiểm" />
      <ScrollView
        style={styles.scroll_view}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
        }>
        {data && (
          <>
            <View style={styles.session_top}>
              <View style={styles.group}>
                <Text style={styles.group_title}>Xe đăng ký</Text>
                <Text style={styles.group_content}>
                  {converLicensePlate(
                    data.license_plate || data.license_plates,
                  )}
                </Text>
              </View>
              <View style={[styles.group, {flexDirection: 'row'}]}>
                <View style={{flex: 1}}>
                  <Text style={styles.group_title}>Ngày đăng ký</Text>
                  <Text style={styles.group_content}>
                    {formatDate(data?.date)}
                  </Text>
                </View>
                <View style={{width: 15}} />
                <View style={{flex: 1}}>
                  <Text style={styles.group_title}>Giờ đăng ký</Text>
                  <Text style={styles.group_content}>
                    {data.registry_time?.slice(0, 5)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.session_bottom}>
              {data?.address ? (
                <View style={styles.address}>
                  <View style={styles.check}>
                    <View style={styles.check_box}>
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
                  </View>
                  <View>
                    <View style={styles.group}>
                      <Text style={styles.group_title}>Địa chỉ nhận xe</Text>
                      <Text style={styles.group_content}>{data?.address}</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <></>
              )}
              <View style={styles.fee_group}>
                <FeeContent
                  title="Phí kiểm định xe cơ giới"
                  price={convertPrice(data.fee.tariff) + ' đ'}
                />
                {data?.address ? (
                  <FeeContent
                    title="Phí đăng kiểm hộ"
                    price={convertPrice(data.fee.serviceCost) + ' đ'}
                  />
                ) : (
                  <></>
                )}
                <FeeContent
                  title="Phí cấp giấy chứng nhận kiểm định"
                  price={convertPrice(data.fee.license_fee) + ' đ'}
                />
                <FeeContent
                  title="Phí đường bộ/tháng"
                  price={convertPrice(data.fee.road_fee) + ' đ'}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 15}}>
              <View style={styles.note}>
                <Text style={styles.note_title}>Lưu ý:</Text>
                <Text style={styles.note_content}>
                  Tổng cộng dự kiến chỉ là số liệu tham khảo. Số tiền thực tế có
                  thể sẽ thay đổi tùy thuộc vào thời gian thanh toán Phí bảo trì
                  đường bộ
                </Text>
              </View>
            </View>
            {data?.staff ? (
              <View>
                <Text style={styles.title}>Thông tin đăng kiểm hộ</Text>
                <View style={styles.group}>
                  <Text style={styles.group_title}>Nhân viên nhận xe</Text>
                  <Text style={styles.group_content}>{data?.staff?.name}</Text>
                </View>
                <View style={styles.group}>
                  <Text style={styles.group_title}>Ngày sinh</Text>
                  <Text style={styles.group_content}>
                    {data?.staff?.date_birth}
                  </Text>
                </View>
                <View style={styles.group}>
                  <Text style={styles.group_title}>CMND số</Text>
                  <Text style={styles.group_content}>
                    {data?.staff?.id_card}
                  </Text>
                </View>
                <View style={styles.group}>
                  <Text style={styles.group_title}>Số điện thoại</Text>
                  <Text style={styles.group_content}>
                    {data?.staff?.phone_number}
                  </Text>
                </View>
                <View style={styles.group}>
                  <Text style={styles.group_title}>Thời gian nhận xe</Text>
                  <Text style={styles.group_content}>
                    {data?.staff?.car_delivery_time.slice(0, 5)}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
          </>
        )}
      </ScrollView>
      {data && data.isPay === 0 && (
        <Footer
          buttonOkContent="CẬP NHẬT"
          onClickButtonOk={() => {}}
          buttonCancelContent="XÓA"
          style={{
            backgroundColor: '#FFFFFF',
          }}
          onClickButtonCancel={handleDelete}
        />
      )}
    </View>
  );
};

export default RegistrationDetailScreen;

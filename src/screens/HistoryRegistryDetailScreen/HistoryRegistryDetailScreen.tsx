import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect} from 'react';
import {HistoryRegistryDetailScreenProps} from './HistoryRegistryDetailScreen.types';
import {IRegistrationDetail} from '../../types';
import {RegistryApi} from '../../services/api';
import {Header} from '../../components';
import {styles} from './HistoryRegistryDetailScreen.styled';
import {converLicensePlate, convertPrice, formatDate} from '../../utils/string';
import {BASE_URL} from '../../config';

const HistoryRegistryDetailScreen: FC<HistoryRegistryDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {id, car} = route.params;
  const [data, setData] = React.useState<IRegistrationDetail>();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await RegistryApi.getRegitryDetail(id);
      if (res.status === 1) {
        setData(res.data);
      } else {
        throw new Error('');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title="Chi tiết lịch sử" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
        }>
        {data && (
          <>
            <View style={styles.general}>
              <Text style={styles.title}>Thông tin chung</Text>
              <View style={styles.general_group}>
                <View style={styles.general_group_left}>
                  {car.display_image ? (
                    <Image
                      source={{
                        uri: BASE_URL + car.display_image,
                      }}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 3,
                        resizeMode: 'cover',
                        marginRight: 12,
                      }}
                    />
                  ) : (
                    <View style={styles.nullWrapper}>
                      <Text style={styles.nullText}>Chưa thêm ảnh</Text>
                    </View>
                  )}
                  <View>
                    <Text style={styles.general_group_title}>
                      Biển kiểm soát
                    </Text>
                    <Text style={styles.general_group_content}>
                      {converLicensePlate(car.license_plates)}
                    </Text>
                  </View>
                </View>
                {data?.address ? (
                  <Text style={styles.general_group_right}>Đăng kiểm hộ</Text>
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>Thông tin đăng kiểm</Text>
              <View style={styles.content_box}>
                <Text style={styles.content_box_title}>ngày đăng kiểm</Text>
                <Text style={styles.content_box_text}>
                  {formatDate(data.date)}
                </Text>
              </View>
              {data?.address ? (
                <View style={styles.content_box}>
                  <Text style={styles.content_box_title}>
                    Thông tin đăng kiểm hộ
                  </Text>
                  <Text style={styles.content_box_text}>
                    Nhận xe tại {data?.address}
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <View style={styles.content_box}>
                <Text style={styles.content_box_title}>
                  ngày hết hạn đăng kiểm
                </Text>
                <Text style={styles.content_box_text}>
                  {formatDate(data.planDate)}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={styles.content_box_title}>
                  Ngày hết Hạn phí bảo trì đường bộ
                </Text>
                <Text style={styles.content_box_text}>
                  {formatDate(data.paymentAt)}
                </Text>
              </View>
            </View>
            <View style={styles.fee}>
              <Text style={styles.title}>Thông tin phí</Text>
              <View style={styles.fee_group}>
                <Text style={styles.fee_group_left}>
                  Phí kiểm định xe cơ giới
                </Text>
                <Text style={styles.fee_group_right}>
                  {convertPrice(data.fee.tariff)} đ
                </Text>
              </View>
              {data?.address ? (
                <View style={styles.fee_group}>
                  <Text style={styles.fee_group_left}>Phí đăng kiểm hộ</Text>
                  <Text style={styles.fee_group_right}>
                    {convertPrice(data.fee.serviceCost)} đ
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <View style={styles.fee_group}>
                <Text style={styles.fee_group_left}>
                  Phí cấp giấy chứng nhận kiểm định
                </Text>
                <Text style={styles.fee_group_right}>
                  {convertPrice(data.fee.license_fee)} đ
                </Text>
              </View>
              <View style={styles.fee_group}>
                <Text style={styles.fee_group_left}>Phí đường bộ/tháng</Text>
                <Text style={styles.fee_group_right}>
                  {convertPrice(data.fee.road_fee)} đ
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HistoryRegistryDetailScreen;

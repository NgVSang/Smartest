import {Image, RefreshControl, ScrollView, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {NotificationDetailScreenProps} from './NotificationDetailScreen.types';
import {Header, Infringe} from '../../components';
import {NotificationApi} from '../../services/api';
import {INoticeDetail} from '../../types';
import {styles} from './NotificationDetailScreen.styled';
import {converLicensePlate, formatDate} from '../../utils/string';
import dayjs from 'dayjs';
import {fonts} from '../../constants';

const NotificationDetailScreen: FC<NotificationDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {id} = route.params;
  const [data, setData] = useState<INoticeDetail>();
  const [isLoading, setIsLoading] = useState(false);

  const getDay = (firstDate: string, secondDate: string) => {
    const first = new Date(firstDate).getTime();
    const second = new Date(secondDate).getTime();
    return (first - second) / 86400000;
  };

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      setData(undefined);
      const res = await NotificationApi.getNotificationsById(id);
      if (res.status === 1) {
        setData(res.data);
        console.log(res.data);
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

  const renderIcon = useMemo(() => {
    if (data) {
      switch (data.type) {
        case 1:
          return (
            <Image
              source={require('../../assets/icons/notice_expired_icon.png')}
              style={styles.icon}
            />
          );
        case 2:
          return (
            <Image
              source={require('../../assets/icons/notice_registry_icon.png')}
              style={styles.icon}
            />
          );
        case 4:
          return (
            <Image
              source={require('../../assets/icons/notice_regular_icon.png')}
              style={styles.icon}
            />
          );
        case 6:
        case 7:
          return (
            <Image
              source={require('../../assets/icons/notice_complete_icon.png')}
              style={styles.icon}
            />
          );
        default:
          return <></>;
      }
    }
    return <></>;
  }, [data]);

  const renderTitle = useMemo(() => {
    if (data) {
      switch (data.type) {
        case 1:
          return 'Xe của bạn gần tới hạn đăng kiểm';
        case 2:
          return 'Xe của bạn có lịch đăng kiểm';
        case 4:
          return data.content;
        case 6:
          return 'Xe của bạn gần tới hạn đăng kiểm';
        case 7:
          return 'Xe của bạn không đạt đăng kiểm';
        default:
          return '';
      }
    }
    return '';
  }, [data]);

  const renderInfor = useMemo(() => {
    const now = dayjs(new Date()).format('YYYY-MM-DD');
    if (data && (data.type === 6 || data.type === 7)) {
      return (
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={styles.row}>
            <View>
              <Text style={styles.license_plates}>Biển kiểm soát</Text>
              <Text style={styles.group_content_license_plates}>
                {converLicensePlate(data?.data)}
              </Text>
            </View>
          </View>
          {data.type === 6 ? (
            <Text style={styles.pass}>Đạt</Text>
          ) : (
            <Text style={styles.not_pass}>Không đạt</Text>
          )}
        </View>
      );
    }
    if (data && (data.type === 1 || data.type === 2)) {
      return (
        <View>
          <Text style={styles.group_content_license_plates}>
            {converLicensePlate(data?.data)}
          </Text>
          <View style={styles.group_content_time}>
            <Text style={styles.group_content_time_left}>
              Ngày đến hạn đăng kiểm: {formatDate(data.date)}
            </Text>
            {now == data.date ? (
              <Text style={styles.group_content_time_right}>Ngày hôm nay</Text>
            ) : (
              <></>
            )}
            {now > data.date ? (
              <Text style={styles.group_content_time_right}>
                Trễ {-getDay(data?.date, now)} ngày
              </Text>
            ) : (
              <></>
            )}
            {now < data.date ? (
              <Text style={styles.group_content_time_right}>
                Còn {getDay(data?.date, now)} ngày
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
      );
    }
    return <></>;
  }, [data]);

  const renderContent = useMemo(() => {
    if (data && data.type === 1) {
      return (
        <View>
          <View
            style={{
              padding: 15,
              paddingBottom: 5,
            }}>
            <Text style={styles.group_content_title}>lỗi vi phạm</Text>
            {data.errors?.map(infringe => (
              <Infringe data={infringe} key={infringe.id} />
            ))}
          </View>
        </View>
      );
    }
    if (data && data.type === 2) {
      return (
        <View>
          <View
            style={{
              padding: 15,
              paddingBottom: 5,
            }}>
            <Text style={styles.group_content_title}>Thông tin đăng kiểm</Text>
            <Text
              style={{
                fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
                fontSize: 13,
                lineHeight: 18,
                fontWeight: '400',
                color: '#2C3442',
              }}>
              Ngày đã đăng ký đăng kiểm:{' '}
              <Text
                style={{
                  fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
                  fontSize: 13,
                  lineHeight: 18,
                  fontWeight: '700',
                  color: '#00A32E',
                }}>
                {formatDate(data?.date)}
              </Text>
            </Text>
          </View>
        </View>
      );
    }

    if (data && (data.type === 6 || data.type === 7)) {
      return (
        <View style={{paddingHorizontal: 15, marginTop: 10}}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Text style={styles.title}>Thông tin đăng kiểm</Text>
            {data?.detail?.address ? (
              <Text style={styles.addres}>Đăng kiểm hộ</Text>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.content_box}>
            <Text style={styles.content_box_title}>ngày đăng kiểm</Text>
            <Text style={styles.content_box_text}>
              {formatDate(data?.detail?.date)
                ? formatDate(data?.detail?.date)
                : 'Không có dữ liệu'}
            </Text>
          </View>
          {data?.detail?.address ? (
            <View style={styles.content_box}>
              <Text style={styles.content_box_title}>
                Thông tin đăng kiểm hộ
              </Text>
              <Text style={styles.content_box_text}>
                Nhận xe tại {data?.detail?.address}
              </Text>
            </View>
          ) : (
            <></>
          )}
          {data?.type == 6 && (
            <>
              <View style={styles.content_box}>
                <Text style={styles.content_box_title}>
                  ngày hết hạn đăng kiểm
                </Text>
                <Text style={styles.content_box_text}>
                  {formatDate(data?.detail?.plan_date)
                    ? formatDate(data?.detail?.plan_date)
                    : 'Không có dữ liệu'}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={styles.content_box_title}>
                  Ngày hết Hạn phí bảo trì đường bộ
                </Text>
                <Text style={styles.content_box_text}>
                  {formatDate(data?.detail?.payment_date)
                    ? formatDate(data?.detail?.payment_date)
                    : 'Không có dữ liệu'}
                </Text>
              </View>
            </>
          )}
        </View>
      );
    }
    return <></>;
  }, [data]);

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Header title="Chi tiết thông báo" />
      <ScrollView
        style={styles.scroll_view}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
        }>
        <View style={styles.session}>
          <View style={styles.group_image}>
            {renderIcon}
            <Text style={styles.group_text}>{renderTitle}</Text>
          </View>
          <View style={styles.group_content}>
            <Text style={styles.group_content_title}>Thông tin chung</Text>
            {renderInfor}
          </View>
        </View>
        <View style={styles.content}>{renderContent}</View>
      </ScrollView>
    </View>
  );
};

export default NotificationDetailScreen;

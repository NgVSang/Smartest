import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback} from 'react';
import {CarInformationProps} from './CarInformation.types';
import {styles} from './CarInformation.styled';
import {BASE_URL} from '../../../config';
import {fonts} from '../../../constants';
import {converLicensePlate} from '../../../utils/string';
import dayjs from 'dayjs';

const CarInformation: FC<CarInformationProps> = ({data, onPress, style}) => {
  const now = dayjs(new Date()).format('YYYY-MM-DD');

  const handlePress = useCallback(() => {
    if (onPress) onPress();
  }, [onPress]);

  const getDay = useCallback((firstDate: string, secondDate: string) => {
    const first = new Date(firstDate).getTime();
    const second = new Date(secondDate).getTime();
    return (first - second) / 86400000;
  }, []);

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.box, style]}>
      <View style={styles.box_left}>
        {data.display_image ? (
          <Image
            source={{uri: BASE_URL + data.display_image}}
            style={styles.image}
          />
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#EFF2F8',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
                fontSize: 13,
              }}>
              Chưa thêm ảnh
            </Text>
          </View>
        )}
      </View>
      <View style={styles.box_right}>
        <Text style={styles.license_plates}>
          {converLicensePlate(data.license_plates)}
        </Text>
        <Text style={styles.content_style}>Loại: {data.type}</Text>
        {data.date && (
          <Text style={styles.content_style}>
            Đăng kiểm gần nhất: {dayjs(data.date).format('DD/MM/YYYY')}
          </Text>
        )}
        {data.plan_date && (
          <Text style={styles.content_style}>
            Kế hoạch đăng kiểm tiếp theo:{' '}
            {dayjs(data.plan_date).format('DD/MM/YYYY')}
          </Text>
        )}
        {data.plan_date && now > data.plan_date && (
          <View style={styles.group}>
            <Text style={styles.message}>
              Đã quá hạn đăng kiểm {getDay(now, data.plan_date)} ngày
            </Text>
            <TouchableOpacity
              style={styles.content_box}
              onPress={() => {
                // NavigationService.navigate('Registration/Add', {
                //   carIndex: carIndex,
                //   Id: data.id,
                //   license: data.license_plates,
                // })
              }}>
              <Text style={styles.content_box_style}>
                Đăng ký đăng kiểm ngay
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CarInformation;

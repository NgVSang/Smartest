import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback} from 'react';
import {RegistryProps} from './Registry.types';
import {styles} from './Registry.styled';
import dayjs from 'dayjs';
import {BASE_URL} from '../../../config';
import {converLicensePlate} from '../../../utils/string';

const Registry: FC<RegistryProps> = ({data, style, onPress}) => {
  const handlePress = useCallback(() => {
    if (onPress) onPress();
  }, [onPress]);

  return (
    <TouchableOpacity style={[styles.box, style]} onPress={handlePress}>
      <View style={styles.box_left}>
        {data.display_image ? (
          <Image
            source={{uri: BASE_URL + data.display_image}}
            style={styles.image}
          />
        ) : (
          <View style={styles.nullImage}>
            <Text style={styles.nullImageText}>Chưa thêm ảnh</Text>
          </View>
        )}
      </View>
      <View style={styles.box_right}>
        <Text style={styles.license_plates}>
          {converLicensePlate(data.license_plate)}
        </Text>
        <Text style={styles.content_style}>Loại: {data.type}</Text>
        {data.completed_at ? (
          <Text style={styles.content_style}>
            Đăng kiểm gần nhất:{' '}
            {data.completed_at
              ? dayjs(data.completed_at).format('DD/MM/YYYY')
              : 'Chưa có'}
          </Text>
        ) : (
          <></>
        )}
        {data.status == 0 ? (
          <View style={[styles.content_box, {backgroundColor: '#B6DCFF'}]}>
            <Text style={[styles.content_box_style, {color: '#025686'}]}>
              Đã đăng ký
            </Text>
          </View>
        ) : (
          <>
            {data.status == 1 ? (
              <View style={[styles.content_box, {backgroundColor: '#FFE9B1'}]}>
                <Text style={[styles.content_box_style, {color: '#714B14'}]}>
                  Đã nộp tiền
                </Text>
              </View>
            ) : (
              <></>
            )}
          </>
        )}
        {data.registration_for ? (
          <Text style={styles.registration_for}>
            Có nhờ đăng kiểm hộ - {data.registration_for}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Registry;

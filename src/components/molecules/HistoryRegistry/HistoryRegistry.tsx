import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {HistoryRegistryProps} from './HistoryRegistry.types';
import {styles} from './HistoryRegistry.styled';
import dayjs from 'dayjs';
import {converLicensePlate} from '../../../utils/string';

const HistoryRegistry: FC<HistoryRegistryProps> = ({data, ...props}) => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.history}>
        <Text style={styles.history_content}>
          Ngày đăng kiểm: {dayjs(data.date).format('DD/MM/YYYY')}
        </Text>
        <View style={styles.history_group}>
          <Text style={styles.history_group_left}>
            {converLicensePlate(data.license_plate)}
          </Text>
          {data.address ? (
            <Text style={styles.history_group_right}>Đăng kiểm hộ</Text>
          ) : (
            <></>
          )}
        </View>
        <Text style={styles.history_content}>
          Hạn đăng kiểm: {dayjs(data.payment_date).format('DD/MM/YYYY')}
        </Text>
        <Text style={styles.history_content}>
          Hạn phí bảo trì đường bộ: {dayjs(data.plan_date).format('DD/MM/YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryRegistry;

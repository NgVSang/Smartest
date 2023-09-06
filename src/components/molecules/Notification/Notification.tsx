import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useMemo} from 'react';
import {NotificationProps} from './Notification.types';
import {styles} from './Notification.styled';
import {colors} from '../../../constants';
import {NavigationService} from '../../../services/navigation';
import dayjs from 'dayjs';

const Notification: FC<NotificationProps> = ({data}) => {
  const renderIcon = useMemo(() => {
    switch (data.type) {
      case 1:
        return (
          <Image
            source={require('../../../assets/icons/notice_expired_icon.png')}
            style={styles.icon}
          />
        );
      case 2:
        return (
          <Image
            source={require('../../../assets/icons/notice_registry_icon.png')}
            style={styles.icon}
          />
        );
      case 4:
        return (
          <Image
            source={require('../../../assets/icons/notice_regular_icon.png')}
            style={styles.icon}
          />
        );
      case 6:
      case 7:
        return (
          <Image
            source={require('../../../assets/icons/notice_complete_icon.png')}
            style={styles.icon}
          />
        );
      default:
        return <></>;
    }
  }, [data.type]);

  const handlePress = useCallback(() => {
    NavigationService.push<'NotificationDetail'>('NotificationDetail', {
      id: data.id,
    });
  }, [data.id]);

  return (
    <TouchableOpacity
      style={[
        styles.notification,
        {
          backgroundColor:
            data.is_read === 1 ? colors.WHITE : colors.LIGHT_GREEN,
        },
      ]}
      onPress={handlePress}>
      {renderIcon}
      <View style={styles.group}>
        <Text
          style={
            data.is_read === 1 ? styles.content_read : styles.content_not_read
          }>
          {data.content}
        </Text>
        <Text style={styles.time}>
          {dayjs(data.time).format('DD/MM/YYYY hh:mm:ss')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;

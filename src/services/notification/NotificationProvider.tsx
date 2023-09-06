import {Alert, Platform, View, Clipboard} from 'react-native';
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {PERMISSIONS, request} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

const NotificationProvider: FC<PropsWithChildren> = ({children}) => {
  const handleSubscribe = async () => {
    if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    }
    try {
      // Đăng ký thiết bị cho FCM
      await messaging().registerDeviceForRemoteMessages();

      // Lấy mã thiết bị
      const fcmToken = await messaging().getToken();
      Alert.alert('Mã của bạn:', fcmToken, [
        {
          text: 'Cancel',
        },
        {
          text: 'Copy',
          onPress: () => {
            Clipboard.setString(fcmToken);
          },
        },
      ]);
      console.log('FCM Token:', fcmToken);
    } catch (error: any) {
      Alert.alert('Lỗi', error);
      console.error('Error subscribing to FCM:', error);
    }
  };

  useEffect(() => {
    handleSubscribe();
  }, []);

  return <View style={{flex: 1}}>{children}</View>;
};

export default NotificationProvider;

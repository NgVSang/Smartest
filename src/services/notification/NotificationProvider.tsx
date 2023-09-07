import {Alert, Platform, View, Clipboard} from 'react-native';
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {PERMISSIONS, request} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {setFcmToken} from '../../redux';

const NotificationProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    }
    try {
      // Đăng ký thiết bị cho FCM
      await messaging().registerDeviceForRemoteMessages();

      // Lấy mã thiết bị
      const fcmToken = await messaging().getToken();
      dispatch(setFcmToken(fcmToken));
      // Alert.alert('Mã của bạn:', fcmToken, [
      //   {
      //     text: 'Cancel',
      //   },
      //   {
      //     text: 'Copy',
      //     onPress: () => {
      //       Clipboard.setString(fcmToken);
      //     },
      //   },
      // ]);
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

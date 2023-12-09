import {Platform, View} from 'react-native';
import React, {FC, PropsWithChildren, useCallback, useEffect} from 'react';
import {PERMISSIONS, request} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {setFcmToken, setStatusNotification} from '../../redux';
import {NotificationApi} from '../api';
import {NavigationService} from '../navigation';

const NotificationProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch();

  const handleGetStatusNotification = useCallback(async () => {
    try {
      const res = await NotificationApi.getNotificationStatus();
      if (res.status === 1 && res.data.status === 1) {
        dispatch(setStatusNotification(true));
      } else {
        dispatch(setStatusNotification(false));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

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
      // console.log(fcmToken);
    } catch (error: any) {
      console.error('Error subscribing to FCM:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'A new FCM message arrived!',
        JSON.stringify(remoteMessage.data),
      );
      dispatch(setStatusNotification(true));
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log(JSON.parse(remoteMessage.data?.data || ''));
    });

    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      if (remoteMessage) {
        const data = JSON.parse(remoteMessage.data?.data || '');
        if (data && data.detail.notiId) {
          NavigationService.reset<'NotificationDetail'>({
            index: 1,
            routes: [
              {
                name: 'Bottom',
              },
              {
                name: 'NotificationDetail',
                params: {
                  id: data.detail.notiId,
                },
              },
            ],
          });
        }
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          const data = JSON.parse(remoteMessage.data?.data || '');
          if (data && data.detail.notiId) {
            NavigationService.reset<'NotificationDetail'>({
              index: 1,
              routes: [
                {
                  name: 'Bottom',
                },
                {
                  name: 'NotificationDetail',
                  params: {
                    id: data.detail.notiId,
                  },
                },
              ],
            });
          }
        }
      });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    handleGetStatusNotification();
    handleSubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <View style={{flex: 1}}>{children}</View>;
};

export default NotificationProvider;

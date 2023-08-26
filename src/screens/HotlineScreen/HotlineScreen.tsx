import {Alert, Linking, View} from 'react-native';
import React, {FC} from 'react';
import {NavigationService} from '../../services/navigation';
import {AuthApi} from '../../services/api';

const HotlineScreen: FC = () => {
  React.useEffect(() => {
    const handleCall = async () => {
      try {
        const res = await AuthApi.get_hotline();
        if (res.status === 1) {
          const url = `tel://${res.data.hot_line}`;
          Linking.openURL(url);
        } else {
          //@ts-ignore
          throw new Error(res.message);
        }
      } catch (error: any) {
        Alert.alert('Thông báo', error.message || 'Lỗi', [
          {
            text: 'OK',
          },
        ]);
      } finally {
        NavigationService.reset({
          index: 0,
          routes: [
            {
              name: 'Bottom',
            },
          ],
        });
      }
    };
    handleCall();
  }, []);
  return <View></View>;
};

export default HotlineScreen;

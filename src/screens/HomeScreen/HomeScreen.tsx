import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import {styles} from './HomeScreen.styled';
import {HomeScreenProps} from './HomeScreen.types';
import {BASE_URL} from '../../config';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MonitoringSchedule} from '../../components';

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const {info} = useSelector(authSelector);
  const insets = useSafeAreaInsets();

  const buttons = useMemo(() => {
    return [
      {
        name: 'Danh sách đăng ký',
        icon: require('../../assets/icons/register_list_icon.png'),
        onPress: () => {
          navigation.push('RegistriesList');
        },
      },
      {
        name: 'Danh sách xe của bạn',
        icon: require('../../assets/icons/car_list_icon.png'),
        onPress: () => {
          navigation.push('CarList');
        },
      },
      {
        name: 'Xem lịch sử đăng kiểm',
        icon: require('../../assets/icons/registry_history_icon.png'),
        onPress: () => {
          navigation.push('HistoryRegistry');
        },
      },
      {
        name: 'Thông tin tích điểm',
        icon: require('../../assets/icons/point_info_icon.png'),
        onPress: () => {},
      },
      {
        name: 'Tra cứu lỗi vi phạm',
        icon: require('../../assets/icons/search_violate_icon.png'),
        onPress: () => {},
      },
      {
        name: 'Thông tin tài khoản',
        icon: require('../../assets/icons/profile_icon.png'),
        onPress: () => {},
      },
    ];
  }, []);

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.header,
          {
            marginTop: insets.top,
          },
        ]}>
        <TouchableOpacity
          style={styles.header_left}
          // onPress={() => navigation.push('Profile')}
        >
          <Image
            source={{uri: BASE_URL + info?.avatar}}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'cover',
              borderRadius: 6,
              marginRight: 10,
            }}
          />
          <View>
            <Text style={styles.header_left_hi}>XIN CHÀO!</Text>
            <Text style={styles.header_left_name}>{info?.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll_view}>
        <MonitoringSchedule
          containerStyle={{
            marginBottom: 20,
          }}
        />
        <View style={styles.manager}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              style={styles.manager_box}
              key={index}
              onPress={button.onPress}>
              <View style={styles.manager_box_icon}>
                <Image source={button.icon} style={styles.icon_style} />
              </View>
              <Text style={styles.manager_content}>{button.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

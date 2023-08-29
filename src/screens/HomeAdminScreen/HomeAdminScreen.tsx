import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import {HomeAdminScreenProps} from './HomeAdminScreen.types';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './HomeAdminScreen.styled';
import {BASE_URL} from '../../config';

const HomeAdminScreen: FC<HomeAdminScreenProps> = ({navigation}) => {
  const {info} = useSelector(authSelector);
  const insets = useSafeAreaInsets();

  const buttons = useMemo(() => {
    return [
      {
        name: 'Lịch theo dõi đăng kiểm',
        icon: require('../../assets/icons/registry_history_icon.png'),
        onPress: () => {
          // navigation.push('RegistriesList');
        },
      },
      {
        name: 'DS Đã đăng ký đăng kiểm',
        icon: require('../../assets/icons/car_list_icon.png'),
        onPress: () => {
          // navigation.push('CarList');
        },
      },
      {
        name: 'DS Đăng kiểm đã thu tiền',
        icon: require('../../assets/icons/registry_history_icon.png'),
        onPress: () => {
          // navigation.push('HistoryRegistry');
        },
      },
      {
        name: 'DS hoàn thành đăng kiểm',
        icon: require('../../assets/icons/point_info_icon.png'),
        onPress: () => {},
      },
      {
        name: 'Xem bảng chấm công',
        icon: require('../../assets/icons/search_violate_icon.png'),
        onPress: () => {
          // navigation.push('Infringe');
        },
      },
      {
        name: 'Xem bảng lương',
        icon: require('../../assets/icons/search_violate_icon.png'),
        onPress: () => {
          // navigation.push('Infringe');
        },
      },
      {
        name: 'Thông tin tài khoản',
        icon: require('../../assets/icons/profile_icon.png'),
        onPress: () => {
          // navigation.push('Profile');
        },
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
          onPress={() => navigation.push('Profile')}>
          <Image
            source={{
              uri:
                BASE_URL + info?.avatar?.replace('http://localhost:8000/', ''),
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'cover',
              borderRadius: 6,
              marginRight: 10,
            }}
          />
          <View>
            <Text style={styles.header_left_name}>{info?.name}</Text>
            <Text style={styles.header_left_hi}>Nhân viên</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll_view}>
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

export default HomeAdminScreen;

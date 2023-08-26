import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback} from 'react';
import {ProfileScreenProps} from './ProfileScreen.types';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, logout} from '../../redux';
import {Footer, Header} from '../../components';
import {styles} from './ProfileScreen.styled';
import {BASE_URL} from '../../config';

const ProfileScreen: FC<ProfileScreenProps> = () => {
  const {info} = useSelector(authSelector);
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất không?', [
      {
        text: 'Hủy',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <Header title="Thông tin tài khoản" />
      <ScrollView style={styles.scroll_view}>
        <View style={styles.user}>
          <Image
            source={{uri: BASE_URL + info?.avatar}}
            style={styles.user_img}
          />
          <Text style={styles.user_name}>{info?.name}</Text>
          <Text style={styles.user_role}>Người dùng</Text>
        </View>
        <View style={styles.information}>
          <View style={styles.information_row}>
            <View style={styles.infor_left}>
              <View style={styles.icon}>
                <Image
                  source={require('../../assets/icons/email_icon.png')}
                  style={{
                    width: 14,
                    height: 14,
                  }}
                />
              </View>
              <Text style={styles.text_normal_style}>Email</Text>
            </View>
            <View style={styles.infor_right}>
              <Text style={[styles.text_normal_style, {color: '#2C3442'}]}>
                {info?.email}
              </Text>
            </View>
          </View>
          <View style={styles.information_row}>
            <View style={styles.infor_left}>
              <View style={styles.icon}>
                <Image
                  source={require('../../assets/icons/phone_icon.png')}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
              </View>
              <Text style={styles.text_normal_style}>Điện thoại</Text>
            </View>
            <View style={styles.infor_right}>
              <Text style={[styles.text_normal_style, {color: '#2C3442'}]}>
                {info?.phone}
              </Text>
            </View>
          </View>
          <View style={styles.information_row}>
            <TouchableOpacity style={styles.infor_left}>
              <View style={styles.icon}>
                <Image
                  source={require('../../assets/icons/change_password_icon.png')}
                  style={{
                    width: 14,
                    height: 14,
                  }}
                />
              </View>
              <Text style={styles.text_touch_style}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.information_row}>
            <TouchableOpacity
              style={styles.infor_left}
              onPress={() => handleLogout()}>
              <View style={styles.icon}>
                <Image
                  source={require('../../assets/icons/logout_icon.png')}
                  style={{
                    width: 14,
                    height: 14,
                  }}
                />
              </View>
              <Text style={styles.text_touch_style}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer
        buttonOkContent={'Cập nhật thông tin'}
        onClickButtonOk={() => {}}
        style={styles.footer_style}
      />
    </View>
  );
};

export default ProfileScreen;

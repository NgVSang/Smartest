import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {UpdateProfileScreenProps} from './UpdateProfileScreen.types';
import {Avatar, Footer, Header} from '../../components';
import {styles} from './UpdateProfileScreen.styled';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, updateCredential} from '../../redux';
import {BASE_URL} from '../../config';
import {IFormData} from '../../types';
import {useFormik} from 'formik';
import {colors} from '../../constants';
import {AuthApi} from '../../services/api';
import Toast from 'react-native-toast-message';

const UpdateProfileScreen: FC<UpdateProfileScreenProps> = ({navigation}) => {
  const {info} = useSelector(authSelector);
  const dispatch = useDispatch();

  const [remove, setRemove] = React.useState(0);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [avatar, setAvatar] = useState<Asset>();

  const handleAddImage = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0]);
    }
  }, []);

  const handleDeleteImage = useCallback(() => {
    if (avatar) {
      setAvatar(undefined);
    } else {
      setRemove(1);
    }
  }, [avatar]);

  const renderAvatar = useMemo(() => {
    if (avatar) {
      return <Image source={{uri: avatar.uri}} style={styles.avatar_image} />;
    }
    if (remove === 1) {
      return (
        <Image
          source={require('../../assets/images/default_avatar.jpg')}
          style={styles.avatar_image}
        />
      );
    }
    return (
      <Avatar imageUrl={BASE_URL + info?.avatar} style={styles.avatar_image} />
    );
  }, [avatar, info?.avatar, remove]);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        setLoadingSubmit(true);
        let dataSend: any;
        if (avatar) {
          dataSend = {
            name: data.name,
            email: data.email,
            removed: remove,
            photos: avatar,
          };
        } else {
          dataSend = {
            name: data.name,
            email: data.email,
            removed: remove,
          };
        }
        console.log(dataSend);

        const res = await AuthApi.updateProfile(dataSend);
        if (res.status === 1) {
          dispatch(
            updateCredential({
              name: dataSend.name,
              email: dataSend.email,
              avatar: res.data.user.avatar,
            }),
          );
          Toast.show({
            type: 'success',
            text1: 'Cập nhập thành công',
          });
          navigation.reset({
            index: 1,
            routes: [
              {
                name: 'Bottom',
              },
              {
                name: 'Profile',
              },
            ],
          });
        } else {
          //@ts-ignore
          throw new Error(res.message);
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Cập nhập thất bại!',
          text2: error.message || 'Vui lòng thử lại.',
        });
      } finally {
        setLoadingSubmit(false);
      }
    },
    [avatar, remove, dispatch, navigation],
  );

  const formik = useFormik({
    initialValues: {
      name: info?.name || '',
      phoneNumber: info?.phone || '',
      email: info?.email || '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <View style={{flex: 1}}>
      <Header title="Cập nhật thông tin" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.avatar}>
          <Text style={styles.avatar_title}>Hình ảnh</Text>
          <View style={styles.avatar_group}>
            {renderAvatar}
            <View style={styles.avatar_event_group}>
              <TouchableOpacity
                style={[styles.avatar_event, {marginBottom: 20}]}
                onPress={handleAddImage}>
                <Image
                  source={require('../../assets/icons/pencil_icon.png')}
                  style={{
                    width: 14,
                    height: 14,
                  }}
                />
                <Text style={[styles.avatar_event_text, {color: '#126FAF'}]}>
                  Tải lại
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.avatar_event}
                onPress={handleDeleteImage}>
                <Image
                  source={require('../../assets/icons/trash_icon.png')}
                  style={{
                    width: 14,
                    height: 14,
                  }}
                />
                <Text
                  style={[
                    styles.avatar_event_text,
                    {color: '#394B6A', opacity: 0.7},
                  ]}>
                  Xóa
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.text_input_style}>
            <Text style={styles.label_style}>Họ và tên</Text>
            <TextInput
              value={formik.values.name}
              style={styles.input_style}
              onChangeText={text => {
                formik.setFieldValue('name', text);
              }}
              placeholder="Nhập"
              placeholderTextColor={colors.LIGHT_BLUE_GRAY}
            />
          </View>
          <View style={styles.text_input_style}>
            <Text style={styles.label_style}>Email</Text>
            <TextInput
              value={formik.values.email}
              style={styles.input_style}
              onChangeText={text => {
                formik.setFieldValue('email', text);
              }}
              placeholder="Nhập"
              placeholderTextColor={colors.LIGHT_BLUE_GRAY}
            />
          </View>
          <View style={styles.text_input_style}>
            <Text style={styles.label_style}>Điện thoại</Text>
            <Text style={styles.input_style}>{info?.phone}</Text>
          </View>
        </View>
      </ScrollView>
      <Footer
        buttonOkContent="LƯU"
        style={styles.footer_style}
        onClickButtonOk={formik.handleSubmit}
        loading={loadingSubmit}
        disabled={loadingSubmit}
      />
    </View>
  );
};

export default UpdateProfileScreen;

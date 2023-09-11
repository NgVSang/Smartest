import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {LoginProps} from './Login.types';
import {styles} from './Login.styled';
import {AuthInput, FormHelper} from '../../molecules';
import {ErrorMessage, Field, FieldProps, Formik} from 'formik';
import {LoginSchema} from '../../../services/validators';
import {IFormData} from '../../../types';
import {Button} from '../../atoms';
import {AuthApi, setHeaderConfigAxios} from '../../../services/api';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, setCredential} from '../../../redux';
import {NavigationService} from '../../../services/navigation';

const Login: FC<LoginProps> = ({}) => {
  const {fcmToken} = useSelector(authSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async (data: IFormData) => {
    setIsLoading(true);
    try {
      const dataSend = {
        phone_number: data.account,
        password: data.password,
        deviceToken: fcmToken,
      };
      const res = await AuthApi.login(dataSend);
      dispatch(setCredential(res.data));
      setHeaderConfigAxios(res.data.access_token);
      NavigationService.reset({
        index: 0,
        routes: [
          {
            name: 'Bottom',
          },
        ],
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message || 'Tài khoản hoặc mật khẩu không đúng!',
        text2: 'Vui lòng thử lại.',
      });
      // try {
      //   const dataSend = {
      //     username: data.account,
      //     password: data.password,
      //   };
      //   const res = await AuthApi.adminLogin(dataSend);
      //   dispatch(setCredential(res.data));
      //   setHeaderConfigAxios(res.data.access_token);
      //   NavigationService.reset({
      //     index: 0,
      //     routes: [
      //       {
      //         name: 'AdminBottom',
      //       },
      //     ],
      //   });
      // } catch (error: any) {
      //   Toast.show({
      //     type: 'error',
      //     text1: error.message || 'Tài khoản hoặc mật khẩu không đúng!',
      //     text2: 'Vui lòng thử lại.',
      //   });
      // }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.title_style}>Đăng nhập</Text>
        </View>
        <Formik
          initialValues={{account: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}>
          {({handleSubmit}) => (
            <View style={styles.form_group}>
              <View style={styles.form_input}>
                <Field name="account">
                  {({field, form}: FieldProps) => (
                    <AuthInput
                      form={form}
                      field={field}
                      title="Số điện thoại hoặc tên đăng nhập"
                      keyboardType="default"
                      placeholder="Nhập"
                    />
                  )}
                </Field>
              </View>
              <View style={styles.form_input}>
                <Field name="password">
                  {({field, form}: FieldProps) => (
                    <AuthInput
                      form={form}
                      field={field}
                      title="Mật khẩu"
                      placeholder={'Nhập'}
                      keyboardType="visible-password"
                    />
                  )}
                </Field>
              </View>
              <View>
                <Button
                  title="ĐĂNG NHẬP"
                  style={{borderRadius: 24}}
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
              <View style={styles.forgotPass}>
                <Text style={styles.textForgot} onPress={() => {}}>
                  Quên mật khẩu ?
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Login;

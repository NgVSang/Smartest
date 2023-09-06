import {ScrollView, Text, View} from 'react-native';
import React, {FC, useCallback} from 'react';
import {RegisterProps} from './Register.types';
import {styles} from './Register.styled';
import {Field, FieldProps, Formik} from 'formik';
import {IFormData} from '../../../types';
import {SignUpSchema} from '../../../services/validators';
import {AuthInput} from '../../molecules';
import {Button} from '../../atoms';

const Register: FC<RegisterProps> = () => {
  const handleRegister = useCallback((data: IFormData) => {}, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.title_style}>Đăng ký</Text>
        </View>
        <Formik
          initialValues={{
            name: '',
            phone_number: '',
            password: '',
            re_password: '',
            email: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleRegister}>
          {({handleSubmit}) => (
            <View style={styles.form_group}>
              <View style={styles.form_input}>
                <Field name="name">
                  {({field, form}: FieldProps) => (
                    <AuthInput
                      form={form}
                      field={field}
                      title="Họ và tên"
                      keyboardType="default"
                      placeholder="Nhập"
                    />
                  )}
                </Field>
              </View>
              <View style={styles.form_input}>
                <Field name="phone_number">
                  {({field, form}: FieldProps) => (
                    <AuthInput
                      form={form}
                      field={field}
                      title="Số điện thoại"
                      keyboardType="phone-pad"
                      placeholder="Nhập"
                    />
                  )}
                </Field>
              </View>
              <View style={styles.form_input}>
                <Field name="email">
                  {({field, form}: FieldProps) => (
                    <AuthInput
                      form={form}
                      field={field}
                      title="Email"
                      keyboardType="email-address"
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
              <View style={styles.form_input}>
                <Field name="re_password">
                  {({field, form}: FieldProps) => (
                    <AuthInput
                      form={form}
                      field={field}
                      title="Xác nhận mật khẩu"
                      placeholder={'Nhập'}
                      keyboardType="visible-password"
                    />
                  )}
                </Field>
              </View>
              <View>
                <Button
                  title="Đăng ký"
                  style={{borderRadius: 24}}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
              {/* <View style={styles.forgotPass}>
                <Text style={styles.textForgot} onPress={() => {}}>
                  Quên mật khẩu ?
                </Text>
              </View> */}
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Register;

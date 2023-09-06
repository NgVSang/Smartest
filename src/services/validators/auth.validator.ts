import * as Yup from 'yup';
import {
  password,
  phone_number,
  account,
  name,
  re_password,
  email,
} from './common';

export const LoginSchema = Yup.object().shape({
  account,
  password,
});

export const SignUpSchema = Yup.object().shape({
  name,
  phone_number,
  password,
  re_password,
  email,
});

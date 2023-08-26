import * as Yup from 'yup';
import {password, phone_number} from './common';

export const LoginSchema = Yup.object().shape({
  phone_number,
  password,
});

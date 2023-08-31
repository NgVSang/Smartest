import * as Yup from 'yup';
import {password, phone_number, account, date, time} from './common';
import {convertDate} from '../../utils/string';

export const LoginSchema = Yup.object().shape({
  account,
  password,
});

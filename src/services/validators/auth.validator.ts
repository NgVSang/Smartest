import * as Yup from 'yup';
import {password, phone_number, account} from './common';

export const LoginSchema = Yup.object().shape({
  account,
  password,
});

export const RegistryTimeSchema = Yup.object().shape({
  car: Yup.string().required('Vui lòng chọn phương tiện'),
  date: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      'Định dạng ngày không hợp lệ. Vui lòng nhập theo định dạng DD/MM/YYYY.',
    )
    .required('Vui lòng nhập ngày'),
  time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Định dạng thời gian không hợp lệ.')
    .required('Vui lòng nhập thời gian.'),
});

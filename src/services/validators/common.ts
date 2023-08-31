import * as Yup from 'yup';
import {convertDate} from '../../utils/string';

const name = Yup.string().required('Vui lòng nhập tên');
const validNumber = Yup.string().required('Vui lòng nhập OTP');
const email = Yup.string()
  .required('Vui lòng nhập Email')
  .email('Vui lòng nhập một email');
const old_password = Yup.string()
  .required('Vui lòng nhập mật khẩu')
  .min(8, 'Mật khẩu có ít nhất 6 kí tự');
const password = Yup.string()
  .required('Vui lòng nhập mật khẩu')
  .min(8, 'Mật khẩu có ít nhất 6 kí tự');
const re_password = Yup.string()
  .required('Vui lòng nhập lại mật khẩu')
  .oneOf([Yup.ref('password')], 'Mật khẩu không khớp');
const phone_number = Yup.string()
  .required('Vui lòng nhập số điện thoại')
  .matches(
    /^(\+84|84|0){1}([3|5|7|8|9]){1}([0-9]{8})$/,
    'Số điện thoại không đúng',
  );
const date = Yup.string()
  .matches(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    'Định dạng ngày không hợp lệ. Vui lòng nhập theo định dạng DD/MM/YYYY.',
  )
  .test('is-future-date', 'Ngày không được trong quá khứ', function (value) {
    if (!value) return true;
    const inputDate = new Date(convertDate(value));
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return inputDate >= currentDate;
  })
  .required('Vui lòng nhập ngày');
const time = Yup.string()
  .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Định dạng thời gian không hợp lệ.')
  .required('Vui lòng nhập thời gian.');

const account = Yup.string().required('Vui lòng nhập tài khoản');

const address = Yup.string().required('Vui lòng chọn địa chỉ');
export {
  email,
  password,
  phone_number,
  re_password,
  validNumber,
  name,
  old_password,
  account,
  date,
  time,
  address,
};

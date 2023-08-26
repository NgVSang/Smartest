import * as Yup from 'yup';

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
export {
  email,
  password,
  phone_number,
  re_password,
  validNumber,
  name,
  old_password,
};

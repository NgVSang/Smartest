import {LoginData, LoginResponse} from '../../types';
import instance from '../api/axios';

const ENDPOINTS = {
  LOGIN: '/customer/auth/login',
  LOGOUT: '/customer/auth/logout',
  GETHOTLINE: '/customer/registries/hot-line',
  RESETPROFILE: '/customer/auth/user',
  RESET_PASSWORD: '/customer/verifyAndResetPassword',
  EXIST_PHONENUMBER: '/customer/checkPhoneNumberExists',
  SIGN_UP: '/customer/registerApp',
  GET_PROFILE: '/customer/auth/user',
  UPLOAD_IMAGE: '/customer/updateAvatarOfUser',
  UPDATE_PROFILE: '/customer/auth/user',
  CHANGE_PASSWORD: '/customer/changePassword',
  GETNOTIFICATION: '/customer/notifications/check',
};

const login = (data: LoginData) => {
  return instance.post<LoginResponse>(ENDPOINTS.LOGIN, data);
};

const get_hotline = () => {
  return instance.get(ENDPOINTS.GETHOTLINE);
};

export const AuthApi = {
  login,
  get_hotline,
};

import {LoginData, LoginResponse} from '../../types';
import instance from '../api/axios';

const ENDPOINTS = {
  LOGIN: '/customer/auth/login',
  LOGIN_ADMIN: '/employee/auth/login',
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

const adminLogin = (data: any) => {
  return instance.post<LoginResponse>(ENDPOINTS.LOGIN_ADMIN, data);
};

const updateProfile = (data: any) => {
  const formData = new FormData();
  if (data.photos) {
    formData.append('photos', {
      uri: data.photos.uri,
      type: 'image/jpeg',
      name: data.photos.fileName,
    });
  }
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('removed', data.removed);
  return instance.patch(ENDPOINTS.UPDATE_PROFILE, formData, {
    headers: {
      accept: 'application/json',
      'Content-Type': `multipart/form-data`,
    },
  });
};

export const AuthApi = {
  login,
  get_hotline,
  adminLogin,
  updateProfile,
};

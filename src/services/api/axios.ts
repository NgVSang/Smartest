import axios, {AxiosResponse} from 'axios';
import {BASE_URL} from '../../config';

const baseURL = BASE_URL + 'api';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const handleSuccessResponse = <T>(response: AxiosResponse<T>) => {
  return response.data;
};
const handleErrorResponse = (error: any) => {
  try {
    return Promise.reject(error.response.data);
  } catch (e) {
    return Promise.reject({message: 'Network Error'});
  }
};

export const setHeaderConfigAxios = (token?: string) => {
  if (token) {
    instance.defaults.headers.common.Authorization = token
      ? 'Bearer ' + token
      : '';
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

instance.interceptors.response.use(handleSuccessResponse, handleErrorResponse);

export default instance;

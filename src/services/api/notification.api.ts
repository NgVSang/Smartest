import {INotice} from '../../types';
import instance from '../api/axios';

const ENDPOINTS = {
  LISTNOTIFICATION: '/customer/notifications',
  NOTIFICATIONDETAIL: '/customer/notifications/info',
};

const getListNotification = (limit?: number, page?: number) => {
  return instance.get<{rows: INotice[]; recordsTotal: number}>(
    ENDPOINTS.LISTNOTIFICATION,
    {
      params: {
        limit: limit || 10,
        page: page || 1,
      },
    },
  );
};

export const NotificationApi = {
  getListNotification,
};

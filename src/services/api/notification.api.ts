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

const getNotificationsById = (id: number) => {
  return instance.get(ENDPOINTS.NOTIFICATIONDETAIL, {
    params: {
      id: id,
    },
  });
};

export const NotificationApi = {
  getListNotification,
  getNotificationsById,
};

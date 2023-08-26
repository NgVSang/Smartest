import {IHistoryRegistry, IRegisGroup, IRegistrationDetail} from '../../types';
import instance from '../api/axios';

const ENDPOINTS = {
  DATEREGISTRY: '/customer/registries/list-registries-future',
  LISTREGISTRIES: '/customer/registries/list-registries',
  GETHISTORYREGISTER: '/customer/registries/list-registries-history',
  REGISTRATIONINFOR: '/customer/registries/info',
};

const getFutureRegistries = () => {
  return instance.get<{rows: {date: string}[]}>(ENDPOINTS.DATEREGISTRY);
};

const getListRegistries = (limit?: number, page?: number) => {
  return instance.get<{rows: IRegisGroup[]; recordsTotal: number}>(
    ENDPOINTS.LISTREGISTRIES,
    {
      params: {
        limit: limit || 1000,
        page: page || 1,
      },
    },
  );
};

const getHistoryRegistries = (licensePlate: string) => {
  return instance.get<IHistoryRegistry[]>(ENDPOINTS.GETHISTORYREGISTER, {
    params: {
      licensePlate: licensePlate,
    },
  });
};

const getRegitryDetail = (registryId: number) => {
  return instance.get<IRegistrationDetail>(ENDPOINTS.REGISTRATIONINFOR, {
    params: {
      registryId: registryId,
    },
  });
};

export const RegistryApi = {
  getFutureRegistries,
  getListRegistries,
  getHistoryRegistries,
  getRegitryDetail,
};

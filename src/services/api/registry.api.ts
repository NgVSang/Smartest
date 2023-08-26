import {IRegisGroup} from '../../types';
import instance from '../api/axios';

const ENDPOINTS = {
  DATEREGISTRY: '/customer/registries/list-registries-future',
  LISTREGISTRIES: '/customer/registries/list-registries',
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
export const RegistryApi = {
  getFutureRegistries,
  getListRegistries,
};

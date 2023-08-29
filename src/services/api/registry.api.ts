import {IHistoryRegistry, IRegisGroup, IRegistrationDetail} from '../../types';
import instance from '../api/axios';

const ENDPOINTS = {
  DATEREGISTRY: '/customer/registries/list-registries-future',
  LISTREGISTRIES: '/customer/registries/list-registries',
  GETHISTORYREGISTER: '/customer/registries/list-registries-history',
  REGISTRATIONINFOR: '/customer/registries/info',
  CUSTOMERCAR: '/customer/cars',
  CHECKREGISTRY: '/customer/cars/check-registry',
  CHECKERROR: '/customer/cars/check-error-by-id',
  GETERROR: '/customer/cars/errors-by-id',
  GETCATEGORY: '/customer/cars/category',
  GETCARTYPE: '/customer/cars/types',
  GETERRORBYCAR: '/customer/cars/errors-by-license-plate',
  ADDNEWCAR: '/customer/cars',
  GETCARINFOR: '/customer/cars/info',
  GETFLIE: '/customer/registries/profile',
  GETLIMITVEHICLES: '/customer/registries/limit-vehicles',
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

const deleteRegistration = (registryId: number) => {
  return instance.get(ENDPOINTS.REGISTRATIONINFOR, {
    params: {
      registryId: registryId,
    },
  });
};

const checkRegistry = (carId: number) => {
  return instance.get(ENDPOINTS.CHECKREGISTRY + '/' + carId);
};

export const RegistryApi = {
  getFutureRegistries,
  getListRegistries,
  getHistoryRegistries,
  getRegitryDetail,
  deleteRegistration,
  checkRegistry,
};

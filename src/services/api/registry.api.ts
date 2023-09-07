import {
  IFee,
  IHistoryRegistry,
  IRegisGroup,
  IRegistrationDetail,
} from '../../types';
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
  COSTCALCULATION: '/customer/registries/cost-calculation',
  REGISTERREGISTRATION: '/customer/registries',
  LISTREGISTERBYID: '/customer/registries/list-registries-date',
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
  return instance.delete(ENDPOINTS.REGISTRATIONINFOR, {
    params: {
      registryId: registryId,
    },
  });
};

const checkRegistry = (carId: number) => {
  return instance.get(ENDPOINTS.CHECKREGISTRY + '/' + carId);
};

const getCostRegistry = (data: {
  carId: string;
  distance?: number;
  address?: string;
}) => {
  return instance.post<{fee: IFee}>(ENDPOINTS.COSTCALCULATION, data);
};

const registerForRegistration = (data: any) => {
  return instance.post(ENDPOINTS.REGISTERREGISTRATION, data);
};

const updateRegistration = (data: any, registryId: number) => {
  return instance.put(ENDPOINTS.REGISTRATIONINFOR, data, {
    params: {
      registryId: registryId,
    },
  });
};

const getRegistriesByDate = (date: string) => {
  return instance.get(ENDPOINTS.LISTREGISTERBYID, {
    params: {
      date: date,
    },
  });
};

export const RegistryApi = {
  getFutureRegistries,
  getListRegistries,
  getHistoryRegistries,
  getRegitryDetail,
  deleteRegistration,
  checkRegistry,
  getCostRegistry,
  registerForRegistration,
  updateRegistration,
  getRegistriesByDate,
};

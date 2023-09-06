import {ICar, ICarDetail, IInfringe} from '../../types';
import instance from './axios';

const ENDPOINTS = {
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

const getListCar = () => {
  return instance.get<{
    rows: ICar[];
    recordsTotal: number;
  }>(ENDPOINTS.CUSTOMERCAR);
};

const check_registry = (carId: number) => {
  return instance.get(ENDPOINTS.CHECKREGISTRY + '/' + carId);
};

const check_error = (carId: number) => {
  return instance.get(ENDPOINTS.CHECKERROR + '/' + carId);
};

const get_err_car = (carId: number) => {
  return instance.get(ENDPOINTS.GETERROR + '/' + carId);
};

const getCarCategory = () => {
  return instance.get(ENDPOINTS.GETCATEGORY);
};

const getCarType = (categoryId: number | string) => {
  return instance.get(ENDPOINTS.GETCARTYPE, {
    params: {
      categoryId,
    },
  });
};

const getInfringeByLicensePlate = (licensePlate: string) => {
  return instance.get<{rows: IInfringe[]; recordsTotal: number}>(
    ENDPOINTS.GETERRORBYCAR,
    {
      params: {
        licensePlate,
      },
    },
  );
};

const createCar = (data: any) => {
  const formData = new FormData();
  formData.append('license_plate', data.license_plate);
  formData.append('manufacture_at', data.manufacture_at);
  formData.append('type', data.type);
  for (let i = 0; i < data.photos.length; i++) {
    formData.append('photos', {
      uri: data.photos[i].uri,
      type: 'image/jpeg',
      name: data.photos[i].fileName,
    });
  }
  return instance.post(ENDPOINTS.ADDNEWCAR, formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
};

const getCarById = (carId: number) => {
  return instance.get<ICarDetail>(ENDPOINTS.GETCARINFOR, {
    params: {
      carId: carId,
    },
  });
};

const deleteCarById = (carId: number) => {
  return instance.delete(ENDPOINTS.GETCARINFOR, {
    params: {
      carId: carId,
    },
  });
};

const updateCarById = (carId: number, data: any) => {
  const formData = new FormData();
  formData.append('license_plate', data.license_plate);
  formData.append('manufacture_at', data.manufacture_at);
  formData.append('type', data.type);
  for (let i = 0; i < data.delete.length; i++) {
    if (i === 0) formData.append('delete[0]', data.delete[i]);
    else formData.append('delete', data.delete[i]);
  }
  for (let i = 0; i < data.photos.length; i++) {
    formData.append('photos', {
      uri: data.photos[i].uri,
      type: 'image/jpeg',
      name: data.photos[i].fileName,
    });
  }
  return instance.put(ENDPOINTS.GETCARINFOR, formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
    params: {
      carId: carId,
    },
  });
};

const getListRequired = () => {
  return instance.get(ENDPOINTS.GETFLIE);
};
const getLimitVehiclesByDate = (date: string) => {
  return instance.get(ENDPOINTS.GETLIMITVEHICLES, {
    params: {
      date: date,
    },
  });
};

export const CarApi = {
  getListCar,
  check_registry,
  check_error,
  get_err_car,
  getCarCategory,
  getCarType,
  getInfringeByLicensePlate,
  createCar,
  getCarById,
  deleteCarById,
  updateCarById,
  getListRequired,
  getLimitVehiclesByDate,
};

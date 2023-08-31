import * as Yup from 'yup';
import {date, time, address} from './common';

export const RegistryTimeSchema = Yup.object().shape({
  car: Yup.string().required('Vui lòng chọn phương tiện'),
  date: date,
  time: time,
});

export const RegistryInfoSchema = Yup.object().shape({
  address: address,
});

export const UpdateRegistrySchema = Yup.object().shape({
  date: date,
  time: time,
  address: address,
});

import {NavigatorScreenParams} from '@react-navigation/native';
import {ICar, ICarDetail, IRegistrationDetail} from '../types';

export type RootStackParamList = {
  Auth: undefined;
  Bottom: NavigatorScreenParams<BottomNavigate> | undefined;
  AdminBottom: NavigatorScreenParams<AdminBottom> | undefined;
  RegistriesList: undefined;
  RegistryDetail: {
    id: number;
  };
  CreateRegistryDetail: undefined;
  CreateRegistryTime: {
    carId?: number;
  };
  CreateRegistryInfor: {
    car: {
      id: string;
      licensePlate: string;
    };
    date: string;
    time: string;
  };
  UpdateRegistry: {
    data: IRegistrationDetail;
  };
  CarList: undefined;
  CarDetail: {
    id: number;
  };
  CreateCar: undefined;
  UpdateCar: {
    id: number;
    data: ICarDetail;
  };
  HistoryRegistry: undefined;
  HistoryRegistryDetail: {
    id: number;
    car: ICar;
  };
  Infringe: undefined;
  InfringeDetail: {
    search: string;
  };
  Profile: undefined;
  UpdateProfile: undefined;
  Map: undefined;
  NotificationDetail: {
    id: number;
  };
};

export type BottomNavigate = {
  HomeTab: undefined;
  NotificationTab: undefined;
  Hotline: undefined;
};

export type AdminBottom = {
  HomeTab: undefined;
  NotificationTab: undefined;
};

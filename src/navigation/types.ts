import {NavigatorScreenParams} from '@react-navigation/native';
import {ICar, ICarDetail} from '../types';

export type RootStackParamList = {
  Auth: undefined;
  Bottom: NavigatorScreenParams<BottomNavigate> | undefined;
  RegistriesList: undefined;
  RegistryDetail: {
    id: number;
  };
  CreateRegistryDetail: undefined;
  CreateRegistryTime: {
    carId?: number;
  };
  CreateRegistryInfor: undefined;
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
};

export type BottomNavigate = {
  HomeTab: undefined;
  NotificationTab: undefined;
  Hotline: undefined;
};

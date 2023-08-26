import {NavigatorScreenParams} from '@react-navigation/native';
import {ICar} from '../types';

export type RootStackParamList = {
  Auth: undefined;
  Bottom: NavigatorScreenParams<BottomNavigate> | undefined;
  RegistriesList: undefined;
  CarList: undefined;
  CarDetail: {
    id: number;
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

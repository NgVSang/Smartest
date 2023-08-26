import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Bottom: NavigatorScreenParams<BottomNavigate> | undefined;
  RegistriesList: undefined;
  CarList: undefined;
};

export type BottomNavigate = {
  HomeTab: undefined;
  NotificationTab: undefined;
  Hotline: undefined;
};

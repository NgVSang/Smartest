import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface NotificationDetailScreenProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'NotificationDetail'
  >;
  route: RouteProp<RootStackParamList, 'NotificationDetail'>;
}

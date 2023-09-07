import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface MonitoringScheduleScreenProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MonitoringSchedule'
  >;
  route: RouteProp<RootStackParamList, 'MonitoringSchedule'>;
}

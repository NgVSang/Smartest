import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface CarDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CarDetail'>;
  route: RouteProp<RootStackParamList, 'CarDetail'>;
}

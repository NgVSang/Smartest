import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface UpdateCarScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UpdateCar'>;
  route: RouteProp<RootStackParamList, 'UpdateCar'>;
}

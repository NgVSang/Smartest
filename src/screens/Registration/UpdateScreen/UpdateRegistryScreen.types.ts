import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface UpdateRegistryScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UpdateRegistry'>;
  route: RouteProp<RootStackParamList, 'UpdateRegistry'>;
}

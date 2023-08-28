import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface RegistrationDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RegistryDetail'>;
  route: RouteProp<RootStackParamList, 'RegistryDetail'>;
}

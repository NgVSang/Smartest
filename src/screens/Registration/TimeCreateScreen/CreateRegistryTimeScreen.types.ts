import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface CreateRegistryTimeScreenProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'CreateRegistryTime'
  >;
  route: RouteProp<RootStackParamList, 'CreateRegistryTime'>;
}

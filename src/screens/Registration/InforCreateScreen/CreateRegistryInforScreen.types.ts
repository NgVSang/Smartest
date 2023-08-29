import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface CreateRegistryInforScreenProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'CreateRegistryInfor'
  >;
  route: RouteProp<RootStackParamList, 'CreateRegistryInfor'>;
}

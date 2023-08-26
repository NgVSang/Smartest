import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface InfringeDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'InfringeDetail'>;
  route: RouteProp<RootStackParamList, 'InfringeDetail'>;
}

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {RouteProp} from '@react-navigation/native';

export interface HistoryRegistryDetailScreenProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'HistoryRegistryDetail'
  >;
  route: RouteProp<RootStackParamList, 'HistoryRegistryDetail'>;
}

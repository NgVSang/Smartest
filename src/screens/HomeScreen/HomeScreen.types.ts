import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomNavigate, RootStackParamList} from '../../navigation/types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Bottom'>;
}

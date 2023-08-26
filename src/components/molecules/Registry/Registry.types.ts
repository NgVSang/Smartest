import {ViewStyle} from 'react-native';
import {IRegistration} from '../../../types';

export interface RegistryProps {
  data: IRegistration;
  style?: ViewStyle;
  onPress?: () => void;
}

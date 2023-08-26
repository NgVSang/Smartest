import {ViewStyle} from 'react-native';
import {ICar} from '../../../types';

export interface CarInformationProps {
  data: ICar;
  style?: ViewStyle;
  onPress?: () => void;
}

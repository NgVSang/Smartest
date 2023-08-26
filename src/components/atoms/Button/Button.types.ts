import {TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  titleStyle?: TextStyle;
  loading?: boolean;
  loadingStyle?: ViewStyle;
  loadingColor?: string;
}

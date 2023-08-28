import {ViewProps} from 'react-native';

export interface FeeContentProps extends ViewProps {
  title: string;
  price: number | string;
}

import {ViewStyle} from 'react-native';
import {
  TextInputMaskOptionProp,
  TextInputMaskProps,
} from 'react-native-masked-text';

export interface DateInputProps {
  label?: string;
  haveCalendar?: boolean;
  onChangeDate?: (date: string) => void;
  date?: string;
  placeholder?: string;
  style: ViewStyle;
  option?: TextInputMaskOptionProp;
}

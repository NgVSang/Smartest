import {TextInputProps, ViewStyle} from 'react-native';
import {TextInputMaskOptionProp} from 'react-native-masked-text';

export interface DateInputProps extends TextInputProps {
  label?: string;
  haveCalendar?: boolean;
  onChangeDate?: (date: string) => void;
  date?: string;
  placeholder?: string;
  style?: ViewStyle;
  option?: TextInputMaskOptionProp;
}

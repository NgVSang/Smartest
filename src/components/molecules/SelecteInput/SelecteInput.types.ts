import {ViewProps, ViewStyle} from 'react-native';

export interface DropDownItem {
  id: number;
  name: string | number;
}

export interface SelecteInputProps extends ViewProps {
  placeholder?: string;
  label?: string;
  items: DropDownItem[];
  value?: any;
  setValues?: (value: DropDownItem) => void;
  dropdownStyle?: ViewStyle;
}

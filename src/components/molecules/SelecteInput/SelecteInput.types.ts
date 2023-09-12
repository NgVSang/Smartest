import {ViewProps, ViewStyle} from 'react-native';

export interface DropDownItem {
  id: number | string;
  name: string | number;
}

export interface SelecteInputProps extends ViewProps {
  placeholder?: string;
  label?: string;
  items: DropDownItem[];
  value?: any;
  nullText?: string;
  setValues?: (value: DropDownItem) => void;
  dropdownStyle?: ViewStyle;
}

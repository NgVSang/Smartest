import {ViewStyle} from 'react-native';

export interface FooterProps {
  buttonOkContent: string;
  buttonCancelContent?: string;
  onClickButtonOk?: () => void;
  onClickButtonCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

import {FieldInputProps, FormikProps, FormikValues} from 'formik';
import {TextInputProps} from 'react-native';

export interface AuthInputProps extends TextInputProps {
  field: FieldInputProps<any>;
  form: FormikProps<FormikValues>;
  title?: string;
}

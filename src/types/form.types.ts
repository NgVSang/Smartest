import * as yup from 'yup';

export interface IFormData {
  [key: string]: string | number | boolean | null | undefined | any;
}
export interface IFormComponent {
  type:
    | 'text'
    | 'number'
    | 'datePicker'
    | 'switch'
    | 'button'
    | 'submit'
    | 'dropdown'
    | 'phone-pad'
    | 'password';
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  validation?: yup.AnySchema;
  //   items?: DropDownItem[];
  zIndex?: number;
}

export interface IFormStructure {
  title?: string;
  description?: string;
  components: IFormComponent[];
}

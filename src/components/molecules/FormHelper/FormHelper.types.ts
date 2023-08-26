import {IFormData, IFormStructure} from '../../../types/form.types';

export interface FormHelperProps {
  formStructure: IFormStructure;
  initValues?: IFormData;
  onSubmit?: (formData: IFormData) => Promise<void>;
}

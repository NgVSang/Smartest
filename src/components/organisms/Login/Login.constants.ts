import {IFormStructure} from '../../../types';

export const LoginStructure: IFormStructure = {
  components: [
    {
      name: 'phone_number',
      type: 'phone-pad',
    },
    {
      name: 'password',
      type: 'password',
    },
  ],
};

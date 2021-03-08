import { UserRegistrationFieldMapping } from './user-registration-field-mapping';

export const USER_REGISTRATION_FIELD_MAPPING: {
  [key: string]: UserRegistrationFieldMapping;
} = {
  FIRST_NAME: {
    formControlName: 'firstName',
  },
  LAST_NAME: {
    formControlName: 'lastName',
  },
  STREET: {
    formControlName: 'street',
  },
  ZIP_CODE: {
    formControlName: 'zipCode',
  },
  CITY: {
    formControlName: 'city',
  },
  PHONE_NUMBER: {
    formControlName: 'phoneNumber',
  },
  EMAIL: {
    formControlName: 'email',
  },
};

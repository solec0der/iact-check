import { CustomerBrandingDTO } from './customer-branding-dto';
import { ActiveUserRegistrationFieldDTO } from './active-user-registration-field-dto';

export interface CustomerDTO {
  id?: number;
  name: string;
  customerBranding?: CustomerBrandingDTO;
  activeUserRegistrationFields: ActiveUserRegistrationFieldDTO[];
  usersWithAccess: string[];
}

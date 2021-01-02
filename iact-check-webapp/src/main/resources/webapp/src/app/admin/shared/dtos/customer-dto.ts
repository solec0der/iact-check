import { CustomerBrandingDTO } from './customer-branding-dto';

export interface CustomerDTO {
  id?: number;
  name: string;
  customerBranding?: CustomerBrandingDTO;
  usersWithAccess: string[];
}

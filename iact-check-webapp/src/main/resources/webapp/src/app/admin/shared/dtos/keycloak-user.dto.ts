export interface KeycloakUserDTO {
  self?: any;
  id: string;
  origin?: any;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName?: any;
  lastName?: any;
  email?: any;
  federationLink?: any;
  serviceAccountClientId?: any;
  attributes?: any;
  credentials?: any;
  disableableCredentialTypes: any[];
  requiredActions: any[];
  federatedIdentities?: any;
  realmRoles?: any;
  clientRoles?: any;
  clientConsents?: any;
  notBefore: number;
  applicationRoles?: any;
  socialLinks?: any;
  groups?: any;
}

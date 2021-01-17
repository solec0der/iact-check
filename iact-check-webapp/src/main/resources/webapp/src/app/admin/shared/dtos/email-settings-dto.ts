export interface EmailSettingsDTO {
  sendEmails: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  smtpTransportStrategy: string;
  fromAddress: string;
  formName: string;
}

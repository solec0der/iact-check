import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailSettingsDTO } from '../dtos/email-settings-dto';
import { Observable } from 'rxjs';
import { CORE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class EmailSettingsService {
  constructor(private httpClient: HttpClient) {}

  public createEmailSettingsByCustomerId(
    customerId: number,
    emailSettings: EmailSettingsDTO
  ): Observable<EmailSettingsDTO> {
    return this.httpClient.post<EmailSettingsDTO>(
      CORE_URL + '/api/admin/customers/' + customerId + '/settings/email',
      emailSettings
    );
  }

  public getEmailSettingsByCustomerId(
    customerId: number
  ): Observable<EmailSettingsDTO> {
    return this.httpClient.get<EmailSettingsDTO>(
      CORE_URL + '/api/admin/customers/' + customerId + '/settings/email'
    );
  }

  public updateEmailSettingsByCustomerId(
    customerId: number,
    emailSettings: EmailSettingsDTO
  ): Observable<EmailSettingsDTO> {
    return this.httpClient.put<EmailSettingsDTO>(
      CORE_URL + '/api/admin/customers/' + customerId + '/settings/email',
      emailSettings
    );
  }
}

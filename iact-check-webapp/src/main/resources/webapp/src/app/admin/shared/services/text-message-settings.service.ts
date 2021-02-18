import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CORE_URL } from '../../../app.config';
import { TextMessageSettingsDTO } from '../dtos/text-message-settings-dto';

@Injectable({
  providedIn: 'root',
})
export class TextMessageSettingsService {
  constructor(private httpClient: HttpClient) {}

  public createTextMessageSettingsByCustomerId(
    customerId: number,
    textMessageSettings: TextMessageSettingsDTO
  ): Observable<TextMessageSettingsDTO> {
    return this.httpClient.post<TextMessageSettingsDTO>(
      CORE_URL +
        '/api/admin/customers/' +
        customerId +
        '/settings/text-message',
      textMessageSettings
    );
  }

  public getTextMessageSettingsByCustomerId(
    customerId: number
  ): Observable<TextMessageSettingsDTO> {
    return this.httpClient.get<TextMessageSettingsDTO>(
      CORE_URL + '/api/admin/customers/' + customerId + '/settings/text-message'
    );
  }

  public updateTextMessageSettingsByCustomerId(
    customerId: number,
    textMessageSettings: TextMessageSettingsDTO
  ): Observable<TextMessageSettingsDTO> {
    return this.httpClient.put<TextMessageSettingsDTO>(
      CORE_URL +
        '/api/admin/customers/' +
        customerId +
        '/settings/text-message',
      textMessageSettings
    );
  }
}

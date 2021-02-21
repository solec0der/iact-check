import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationFieldsDTO } from '../dtos/user-registration-fields-dto';
import { CORE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationFieldService {
  constructor(private httpClient: HttpClient) {}

  public getUserRegistrationFields(): Observable<UserRegistrationFieldsDTO> {
    return this.httpClient.get<UserRegistrationFieldsDTO>(
      CORE_URL + '/api/admin/user-registration-fields'
    );
  }
}

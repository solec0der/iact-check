import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakUserDTO} from '../dtos/keycloak-user.dto';
import {CORE_URL} from '../../../app.config';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAdminService {

  constructor(private httpClient: HttpClient) { }

  public getKeycloakUsers(): Observable<KeycloakUserDTO[]> {
    return this.httpClient.get<KeycloakUserDTO[]>(CORE_URL + '/api/admin/keycloak/users');
  }
}

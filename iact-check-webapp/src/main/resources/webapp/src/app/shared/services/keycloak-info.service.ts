import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakInfoDTO } from '../dtos/keycloak-info-dto';

@Injectable({
  providedIn: 'root',
})
export class KeycloakInfoService {
  constructor(private httpClient: HttpClient) {}

  public getKeycloakInfo(): Observable<KeycloakInfoDTO> {
    return this.httpClient.get<KeycloakInfoDTO>('/api/keycloak-info');
  }
}

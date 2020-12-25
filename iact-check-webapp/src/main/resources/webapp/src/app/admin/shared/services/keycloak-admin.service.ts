import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakUserDto } from '../dtos/keycloak-user-dto';
import { CORE_URL } from '../../../app.config';
import { RoleRepresentationDTO } from '../dtos/role-representation-dto';

@Injectable({
  providedIn: 'root',
})
export class KeycloakAdminService {
  constructor(private httpClient: HttpClient) {}

  public getKeycloakUsers(): Observable<KeycloakUserDto[]> {
    return this.httpClient.get<KeycloakUserDto[]>(
      CORE_URL + '/api/admin/keycloak/users'
    );
  }

  public getRolesByUserId(userId: string): Observable<RoleRepresentationDTO[]> {
    return this.httpClient.get<RoleRepresentationDTO[]>(
      CORE_URL + '/api/admin/keycloak/users/' + userId + '/roles'
    );
  }
}

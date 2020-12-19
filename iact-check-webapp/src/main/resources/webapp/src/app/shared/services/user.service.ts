import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private keycloakService: KeycloakService) {}

  public isSuperUser(): boolean {
    return this.keycloakService.isUserInRole('SUPERUSER');
  }
}

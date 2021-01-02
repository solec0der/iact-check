import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public username: string | undefined;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.username = this.keycloakService.getUsername();
  }

  public openAccountInKeycloak(): void {
    window.location.href = this.keycloakService
      .getKeycloakInstance()
      .createAccountUrl();
  }

  public logout(): void {
    this.keycloakService.logout().then();
  }
}

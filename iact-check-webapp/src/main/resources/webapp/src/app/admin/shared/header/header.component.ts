import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {}

  public getUsername(): string {
    return this.keycloakService.getUsername();
  }

  public openAccountInKeycloak() {
    window.location.href = this.keycloakService.getKeycloakInstance().createAccountUrl();
  }

  public logout(): void {
    this.keycloakService.logout().then();
  }
}

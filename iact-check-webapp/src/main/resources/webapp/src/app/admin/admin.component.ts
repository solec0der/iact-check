import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.keycloakService.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.keycloakService.login().then();
      }
    });
  }
}

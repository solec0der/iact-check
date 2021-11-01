import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private themeService: ThemeService, private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.themeService.setDefaultTheme();
    this.keycloakService.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.keycloakService.login().then();
      }
    });
  }
}

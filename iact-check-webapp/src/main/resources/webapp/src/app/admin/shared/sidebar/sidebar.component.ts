import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../menu-items';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public MENU_ITEMS = MENU_ITEMS;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {}

  public hasUserRoles(roles: string[]): boolean {
    const userRoles = this.keycloakService.getUserRoles(true);

    for (const role of roles) {
      if (userRoles.includes(role)) {
        return true;
      }
    }
    return false;
  }
}

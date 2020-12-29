import { Component, OnInit } from '@angular/core';
import { CUSTOMER_MENU_ITEMS, GENERAL_MENU_ITEMS } from '../menu-items';
import { KeycloakService } from 'keycloak-angular';
import { CustomerDTO } from '../dtos/customer-dto';
import { ActiveCustomerService } from '../services/active-customer.service';
import { ActuatorInfoService } from '../services/actuator-info.service';
import { ActuatorInfo } from '../dtos/actuator-info';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public activeMenuItems = GENERAL_MENU_ITEMS;
  public actuatorInfo!: ActuatorInfo;
  private activeCustomer: CustomerDTO | undefined;

  constructor(
    private keycloakService: KeycloakService,
    private actuatorInfoService: ActuatorInfoService,
    private activeCustomerService: ActiveCustomerService
  ) {}

  ngOnInit(): void {
    this.activeCustomerService
      .getActiveCustomer()
      .subscribe((activeCustomer) => {
        this.activeCustomer = activeCustomer;

        if (this.activeCustomer) {
          this.resolveCustomerIdInRouterLinks();
        } else {
          this.activeMenuItems = GENERAL_MENU_ITEMS;
        }
      });

    this.loadActuatorInfo();
  }

  public hasUserRoles(roles: string[]): boolean {
    const userRoles = this.keycloakService.getUserRoles(true);

    for (const role of roles) {
      if (userRoles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  private resolveCustomerIdInRouterLinks() {
    this.activeMenuItems = [];
    CUSTOMER_MENU_ITEMS.forEach((menuItem) =>
      this.activeMenuItems.push(Object.assign({}, menuItem))
    );

    this.activeMenuItems.forEach((menuItem) => {
      menuItem.routerLink = menuItem.routerLink.replace(
        '{customerId}',
        // @ts-ignore
        this.activeCustomer.id.toString()
      );
    });
  }

  private loadActuatorInfo(): void {
    this.actuatorInfoService.getActuatorInfo().subscribe((actuatorInfo) => {
      this.actuatorInfo = actuatorInfo;
    });
  }
}

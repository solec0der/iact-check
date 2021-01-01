import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../shared/services/user.service';
import { CustomerService } from '../../shared/services/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakAdminService } from '../../shared/services/keycloak-admin.service';
import { ActiveCustomerService } from '../../shared/services/active-customer.service';

@Component({
  selector: 'app-customer-branding',
  templateUrl: './customer-branding.component.html',
  styleUrls: ['./customer-branding.component.scss'],
})
export class CustomerBrandingComponent implements OnInit {
  public customerId = -1;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private keycloakAdminService: KeycloakAdminService,
    private activeCustomerService: ActiveCustomerService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);
  }
}

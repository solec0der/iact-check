import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../shared/services/customer.service';
import { CustomerDTO } from '../../shared/dtos/customer-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakAdminService } from '../../shared/services/keycloak-admin.service';
import { KeycloakUserDTO } from '../../shared/dtos/keycloak-user.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  public action: string = '';
  public customerId: number = -1;
  public displayedColumnsUsersWithAccess = ['username', 'hasAccess'];
  public usersWithAccessDataSource!: MatTableDataSource<KeycloakUserDTO>;
  private customerDTO!: CustomerDTO;

  public customerFormGroup!: FormGroup;

  @ViewChild(MatPaginator) usersWithAccessPaginator!: MatPaginator;

  constructor(
    private router: Router,
    private matSnackBar: MatSnackBar,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private keycloakAdminService: KeycloakAdminService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      this.customerService
        .getCustomerById(this.customerId)
        .subscribe((customer) => {
          this.customerDTO = customer;
          this.createCustomerFromGroup();
        });
    } else if (this.action === 'create') {
      this.createCustomerFromGroup();
    }

    this.keycloakAdminService.getKeycloakUsers().subscribe((keycloakUsers) => {
      this.usersWithAccessDataSource = new MatTableDataSource<KeycloakUserDTO>(
        keycloakUsers
      );
      this.usersWithAccessDataSource.paginator = this.usersWithAccessPaginator;
    });
  }

  public save(): void {
    if (this.action === 'create') {
      this.createCustomer();
    }
  }

  public isUserInUsersWithAccess(userId: string): boolean {
    return (
      this.customerDTO.usersWithAccess.includes(userId) ||
      this.userService.isSuperUser()
    );
  }

  public isUserLoggedInUser(username: string): boolean {
    return this.userService.getUsername() === username;
  }

  private createCustomer(): void {
    const customerDTO: CustomerDTO = {
      name: this.customerFormGroup.value.name,
      primaryColour: '#' + this.customerFormGroup.value.primaryColour.hex,
      accentColour: '#' + this.customerFormGroup.value.accentColour.hex,
      usersWithAccess: [],
    };

    this.customerService.createCustomer(customerDTO).subscribe((response) => {
      this.router
        .navigate(['admin', 'customers', response.id, 'edit'])
        .then(() => {
          this.matSnackBar.open(
            this.translateService.instant('CUSTOMERS.CREATED_MESSAGE'),
            this.translateService.instant('SHARED.CLOSE'),
            {
              duration: 5000,
            }
          );
        });
    });
  }

  private createCustomerFromGroup(): void {
    this.customerFormGroup = new FormGroup({
      name: new FormControl(
        this.action === 'edit' ? this.customerDTO?.name : '',
        Validators.required
      ),
      primaryColour: new FormControl(
        this.action === 'edit' ? this.customerDTO?.primaryColour : '',
        Validators.required
      ),
      accentColour: new FormControl(
        this.action === 'edit' ? this.customerDTO?.accentColour : '',
        Validators.required
      ),
    });
  }
}

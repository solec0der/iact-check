import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../shared/services/customer.service';
import { CustomerDTO } from '../../shared/dtos/customer-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakAdminService } from '../../shared/services/keycloak-admin.service';
import { KeycloakUserDto } from '../../shared/dtos/keycloak-user-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../shared/services/user.service';
import { RoleRepresentationDTO } from '../../shared/dtos/role-representation-dto';
import { ColourUtility } from '../../../shared/utils/colour.utility';
import { ActiveCustomerService } from '../../shared/services/active-customer.service';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  public action: string = '';
  public customerId: number = -1;
  public displayedColumnsUsersWithAccess = ['username', 'hasAccess'];
  public keycloakUsersDatasource!: MatTableDataSource<KeycloakUserDto>;
  private usersRoleMappings!: Map<string, RoleRepresentationDTO[]>;
  private customerDTO!: CustomerDTO;
  private usersWithAccess: string[] = [];

  public customerFormGroup!: FormGroup;

  @ViewChild(MatPaginator) usersWithAccessPaginator!: MatPaginator;

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
      this.action = String(params.get('action'));
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      this.customerService
        .getCustomerById(this.customerId)
        .subscribe((customer) => {
          this.activeCustomerService.setActiveCustomer(customer);

          this.customerDTO = customer;
          this.usersWithAccess = customer.usersWithAccess;
          this.createCustomerFromGroup();
        });
    } else if (this.action === 'create') {
      this.createCustomerFromGroup();
    }
  }

  public getAdditionalUserInfoForVisibleUsers(
    pageIndex: number,
    pageSize: number
  ): void {
    const users = this.keycloakUsersDatasource.data.slice(
      pageIndex * pageSize,
      pageIndex * pageSize + pageSize
    );

    this.usersRoleMappings = new Map<string, RoleRepresentationDTO[]>();

    users.forEach((user) => {
      this.keycloakAdminService
        .getRolesByUserId(user.id)
        .subscribe((roleRepresentations) => {
          this.usersRoleMappings.set(user.id, roleRepresentations);
        });
    });
  }

  public addOrRemoveUserFromUsersWithAccess(user: KeycloakUserDto) {
    if (this.usersWithAccess.includes(user.id)) {
      const indexOfUserToBeRemoved = this.usersWithAccess.indexOf(user.id);
      this.usersWithAccess.splice(indexOfUserToBeRemoved, 1);
    } else {
      this.usersWithAccess.push(user.id);
    }
  }

  public save(): void {
    if (this.action === 'create') {
      this.createCustomer();
    } else if (this.action === 'edit') {
      this.updateCustomer();
    }
  }

  public isUserInUsersWithAccess(user: KeycloakUserDto): boolean {
    return this.usersWithAccess.includes(user.id) || this.isUserSuperUser(user);
  }

  public isUserSuperUser(user: KeycloakUserDto): boolean {
    if (this.usersRoleMappings) {
      const userRoleMappings = this.usersRoleMappings.get(user.id);

      if (userRoleMappings) {
        for (let userRoleMapping of userRoleMappings) {
          if (userRoleMapping.name === 'SUPERUSER') {
            return true;
          }
        }
      }
    }
    return false;
  }

  public showCustomerDeletionDialog(): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('CUSTOMERS.DELETION_DIALOG.TITLE'),
        message: this.translateService.instant(
          'CUSTOMERS.DELETION_DIALOG.MESSAGE'
        ),
        buttonTextCancel: this.translateService.instant(
          'CUSTOMERS.DELETION_DIALOG.BUTTON_TEXT_CANCEL'
        ),
        buttonTextConfirm: this.translateService.instant(
          'CUSTOMERS.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'
        ),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deleteCustomer();
      }
    });
  }

  private deleteCustomer() {
    this.customerService
      .deleteCustomerById(<number>this.customerDTO.id)
      .subscribe((_) => {
        this.matSnackBar.open(
          this.translateService.instant('CUSTOMERS.DELETED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
        this.router.navigate(['admin', 'customers']).then();
      });
  }

  get isSuperUser(): boolean {
    return this.userService.isSuperUser();
  }

  private getKeycloakUsers(): void {
    this.keycloakAdminService.getKeycloakUsers().subscribe((keycloakUsers) => {
      this.keycloakUsersDatasource = new MatTableDataSource<KeycloakUserDto>(
        keycloakUsers
      );
      this.keycloakUsersDatasource.paginator = this.usersWithAccessPaginator;
      this.getAdditionalUserInfoForVisibleUsers(
        this.usersWithAccessPaginator.pageIndex,
        this.usersWithAccessPaginator.pageSize
      );
    });
  }

  private createCustomer(): void {
    const customerDTO: CustomerDTO = {
      name: this.customerFormGroup.value.name,
      primaryColour: '#' + this.customerFormGroup.value.primaryColour.hex,
      accentColour: '#' + this.customerFormGroup.value.accentColour.hex,
      usersWithAccess: this.usersWithAccess,
    };

    this.customerService.createCustomer(customerDTO).subscribe((response) => {
      this.customerDTO = response;

      this.activeCustomerService.setActiveCustomer(response);

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

  private updateCustomer(): void {
    const customerDTO: CustomerDTO = {
      name: this.customerFormGroup.value.name,
      primaryColour: '#' + this.customerFormGroup.value.primaryColour.hex,
      accentColour: '#' + this.customerFormGroup.value.accentColour.hex,
      usersWithAccess: this.usersWithAccess,
    };

    this.customerService
      .updateCustomerById(<number>this.customerDTO.id, customerDTO)
      .subscribe((response) => {
        this.customerDTO = response;

        this.activeCustomerService.setActiveCustomer(customerDTO);

        this.matSnackBar.open(
          this.translateService.instant('CUSTOMERS.UPDATED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
      });
  }

  private createCustomerFromGroup(): void {
    const primaryColour = ColourUtility.convertHexToColor(
      this.customerDTO ? this.customerDTO.primaryColour : null
    );
    const accentColour = ColourUtility.convertHexToColor(
      this.customerDTO ? this.customerDTO.accentColour : null
    );

    this.customerFormGroup = new FormGroup({
      name: new FormControl(
        this.action === 'edit' ? this.customerDTO?.name : '',
        Validators.required
      ),
      primaryColour: new FormControl(
        this.action === 'edit' ? primaryColour : '',
        Validators.required
      ),
      accentColour: new FormControl(
        this.action === 'edit' ? accentColour : '',
        Validators.required
      ),
    });

    if (this.isSuperUser) {
      this.getKeycloakUsers();
    }
  }
}

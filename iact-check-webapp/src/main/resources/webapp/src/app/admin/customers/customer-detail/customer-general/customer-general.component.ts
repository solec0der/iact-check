import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CustomerDTO } from '../../../shared/dtos/customer-dto';
import { UserService } from '../../../../shared/services/user.service';
import { KeycloakUserDto } from '../../../shared/dtos/keycloak-user-dto';
import { MatTableDataSource } from '@angular/material/table';
import { RoleRepresentationDTO } from '../../../shared/dtos/role-representation-dto';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { KeycloakAdminService } from '../../../shared/services/keycloak-admin.service';

@Component({
  selector: 'app-customer-general',
  templateUrl: './customer-general.component.html',
  styleUrls: ['./customer-general.component.scss'],
})
export class CustomerGeneralComponent implements OnInit {
  @Input('customerFormGroup') public customerFormGroup!: FormGroup;
  @Input('customer') public customerDTO!: CustomerDTO;
  @Input('usersWithAccess') public usersWithAccess: string[] = [];

  @ViewChild(MatPaginator) private usersWithAccessPaginator!: MatPaginator;

  public displayedColumnsUsersWithAccess = ['username', 'hasAccess'];
  public keycloakUsersDatasource!: MatTableDataSource<KeycloakUserDto>;

  private usersRoleMappings!: Map<string, RoleRepresentationDTO[]>;

  constructor(
    private userService: UserService,
    private keycloakAdminService: KeycloakAdminService
  ) {}

  ngOnInit(): void {
    this.getKeycloakUsers();
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
}

import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/services/customer.service';
import { CustomerDTO } from '../../shared/dtos/customer-dto';
import { UserService } from '../../../shared/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  public customers: CustomerDTO[] = [];
  public columnsCustomers = [
    'id',
    'name',
    'primaryColour',
    'accentColour',
    'actions',
  ];

  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.reload();
  }

  public reload(): void {
    this.loadData();
  }

  get isSuperUser(): boolean {
    return this.userService.isSuperUser();
  }

  public deleteCustomerById(customerId: number): void {
    this.customerService.deleteCustomerById(customerId).subscribe(_ => {
      this.matSnackBar.open(
        this.translateService.instant('CUSTOMERS.DELETED_MESSAGE'),
        this.translateService.instant('SHARED.CLOSE'),
        {
          duration: 5000,
        }
      );
      this.reload();
    });
  }

  private loadData(): void {
    this.customers = [];
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }
}

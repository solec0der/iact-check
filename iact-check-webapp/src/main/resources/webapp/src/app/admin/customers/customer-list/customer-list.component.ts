import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/services/customer.service';
import { CustomerDTO } from '../../shared/dtos/customer-dto';
import { UserService } from '../../../shared/services/user.service';

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
    'usersWithAccess',
    'actions',
  ];

  constructor(
    private userService: UserService,
    private customerService: CustomerService
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

  private loadData(): void {
    this.customers = [];
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }
}

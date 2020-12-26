import { Component, OnInit } from '@angular/core';
import { ActiveCustomerService } from '../../../shared/services/active-customer.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../shared/services/customer.service';
import { CheckDTO } from '../../../shared/dtos/check-dto';
import { CheckService } from '../../../shared/services/check.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss'],
})
export class CheckListComponent implements OnInit {
  public checks: CheckDTO[] = [];
  public displayedColumnsChecks = [
    'id',
    'title',
    'activeFrom',
    'activeTo',
    'actions',
  ];

  private customerId: number = -1;

  constructor(
    private activeCustomerService: ActiveCustomerService,
    private activatedRoute: ActivatedRoute,
    private checkService: CheckService,
    private customerService: CustomerService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('customerId'));
      this.reload();
    });
  }

  ngOnInit(): void {}

  public reload(): void {
    this.loadData();
  }

  public deleteCheckById(checkId: number) {}

  private loadData(): void {
    this.checks = [];

    this.customerService
      .getCustomerById(this.customerId)
      .subscribe((customer) => {
        this.activeCustomerService.setActiveCustomer(customer);
      });

    this.checkService
      .getChecksByCustomerId(this.customerId)
      .subscribe((checks) => {
        this.checks = checks;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { CheckService } from '../admin/shared/services/check.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../admin/shared/services/customer.service';
import { forkJoin } from 'rxjs';
import { CheckStateService } from './check-state.service';
import { CustomerDTO } from '../admin/shared/dtos/customer-dto';
import { CheckDTO } from '../admin/shared/dtos/check-dto';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
})
export class CheckComponent implements OnInit {
  public customerDTO!: CustomerDTO;
  public checkDTO!: CheckDTO;

  private customerId!: number;
  private checkId!: number;

  constructor(
    private checkService: CheckService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private checkStateService: CheckStateService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('customerId'));
      this.checkId = Number(params.get('checkId'));
    });
  }

  ngOnInit(): void {
    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO!;
    });

    this.loadData();
  }

  private loadData(): void {
    const httpRequests = {
      check: this.checkService.getCheckById(this.checkId),
      customer: this.customerService.getCustomerById(this.customerId),
    };

    forkJoin(httpRequests).subscribe((response) => {
      this.checkStateService.setActiveCheck(response['check']);
      this.checkStateService.setActiveCustomer(response['customer']);
    });
  }
}

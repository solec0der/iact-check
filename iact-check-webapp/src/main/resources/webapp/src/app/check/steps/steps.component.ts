import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../check-state.service';
import { CustomerService } from '../../admin/shared/services/customer.service';
import { CORE_URL } from '../../app.config';
import { CustomerDTO } from '../../admin/shared/dtos/customer-dto';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  public currentProgressPercentage = 0.0;
  public customerDTO!: CustomerDTO;

  constructor(
    private readonly customerService: CustomerService,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService
      .getCurrentProgressPercentage()
      .subscribe((currentProgressPercentage) => {
        this.currentProgressPercentage = currentProgressPercentage;
      });

    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO;
    });
  }

  public getCustomerLogoUrl(): string {
    return (
      CORE_URL + '/api/customers/' + this.customerDTO.id + '/branding/logo'
    );
  }
}

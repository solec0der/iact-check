import { Component, OnInit } from '@angular/core';
import { CheckService } from '../shared/services/check.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../shared/services/customer.service';
import { forkJoin } from 'rxjs';
import { CheckStateService } from './check-state.service';
import { CustomerDTO } from '../shared/dtos/customer-dto';
import { CheckDTO } from '../shared/dtos/check-dto';
import { CORE_URL } from '../app.config';
import { ThemeService } from '../shared/services/theme.service';

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
    private themeService: ThemeService,
    private checkStateService: CheckStateService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('customerId'));
      this.checkId = Number(params.get('checkId'));
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  public getCustomerLogoUrl(): string {
    return CORE_URL + '/api/customers/' + this.customerDTO.id + '/branding/logo';
  }

  private loadData(): void {
    const httpRequests = {
      check: this.checkService.getCheckById(this.checkId),
      customer: this.customerService.getCustomerById(this.customerId),
    };

    forkJoin(httpRequests).subscribe((response) => {
      this.checkStateService.setActiveCheck(response['check']);
      this.checkStateService.setActiveCustomer(response['customer']);
      this.customerDTO = response['customer'];

      this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
        if (customerDTO.customerBranding) {
          this.themeService.setColors(
            customerDTO.customerBranding.primaryColour,
            customerDTO.customerBranding.accentColour,
            customerDTO.customerBranding.theme
          );
        }
      });

      this.setupResetEventListener();
    });
  }

  private setupResetEventListener(): void {
    setTimeout(() => {
      document.getElementById('logo-wrapper')?.addEventListener('click', (event) => {
        if (event.detail === 3) {
          this.checkStateService.resetCheck();
        }
      });
    });
  }
}

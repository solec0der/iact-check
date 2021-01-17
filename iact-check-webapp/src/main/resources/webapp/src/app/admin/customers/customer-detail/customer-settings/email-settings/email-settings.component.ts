import { Component, OnInit } from '@angular/core';
import { EmailSettingsService } from '../../../../shared/services/email-settings.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../shared/services/customer.service';
import { EmailSettingsDTO } from '../../../../shared/dtos/email-settings-dto';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss'],
})
export class EmailSettingsComponent implements OnInit {
  public emailSettings!: EmailSettingsDTO;

  private customerId = -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private emailSettingsService: EmailSettingsService
  ) {
    this.activatedRoute.parent?.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);
    this.loadData();
  }

  private loadData(): void {
    this.emailSettingsService
      .getEmailSettingsByCustomerId(this.customerId)
      .subscribe((emailSettings) => {
        this.emailSettings = emailSettings;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { EmailSettingsService } from '../../../../shared/services/email-settings.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../shared/services/customer.service';
import { EmailSettingsDTO } from '../../../../shared/dtos/email-settings-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss'],
})
export class EmailSettingsComponent implements OnInit {
  public emailSettingsFormGroup!: FormGroup;
  public emailSettings!: EmailSettingsDTO;
  public smtpTransportStrategies = ['SMTP', 'SMTPS', 'SMTP_TLS'];

  public hidePassword = true;

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

  public save(): void {
    if (this.emailSettings) {
      this.updateEmailSettings();
    } else {
      this.createEmailSettings();
    }
  }

  public toggleSendEmails(event: MatSlideToggleChange): void {
    for (let controlsKey in this.emailSettingsFormGroup.controls) {
      if (event.checked) {
        this.emailSettingsFormGroup.controls[controlsKey].enable();
      } else {
        this.emailSettingsFormGroup.controls[controlsKey].disable();
      }
    }
    this.emailSettingsFormGroup.get('sendEmails')?.enable();
  }

  private createEmailSettings(): void {
    const emailSettingsDTO = this.createEmailSettingsFromFormGroup();

    this.emailSettingsService
      .createEmailSettingsByCustomerId(this.customerId, emailSettingsDTO)
      .subscribe((emailSettingsDTO) => {
        this.emailSettings = emailSettingsDTO;
        this.createEmailSettingsFormGroup();
      });
  }

  private updateEmailSettings(): void {
    const emailSettingsDTO = this.createEmailSettingsFromFormGroup();

    this.emailSettingsService
      .updateEmailSettingsByCustomerId(this.customerId, emailSettingsDTO)
      .subscribe((emailSettingsDTO) => {
        this.emailSettings = emailSettingsDTO;
        this.createEmailSettingsFormGroup();
      });
  }

  private createEmailSettingsFromFormGroup(): EmailSettingsDTO {
    if (this.emailSettingsFormGroup.value.sendEmails) {
      return {
        sendEmails: this.emailSettingsFormGroup.value.sendEmails,
        smtpHost: this.emailSettingsFormGroup.value.smtpHost,
        smtpPort: this.emailSettingsFormGroup.value.smtpPort,
        smtpUsername: this.emailSettingsFormGroup.value.smtpUsername,
        smtpPassword: this.emailSettingsFormGroup.value.smtpPassword,
        smtpTransportStrategy: this.emailSettingsFormGroup.value
          .smtpTransportStrategy,
        fromAddress: this.emailSettingsFormGroup.value.fromAddress,
        fromName: this.emailSettingsFormGroup.value.fromName,
      };
    } else {
      this.emailSettings.sendEmails = false;
      return this.emailSettings;
    }
  }

  private loadData(): void {
    this.emailSettingsService
      .getEmailSettingsByCustomerId(this.customerId)
      .subscribe((emailSettings) => {
        this.emailSettings = emailSettings;
        this.createEmailSettingsFormGroup();
      });
  }

  private createEmailSettingsFormGroup(): void {
    const isDisabled = this.emailSettings
      ? !this.emailSettings.sendEmails
      : true;
    !this.emailSettings ||
      (this.emailSettings && !this.emailSettings.sendEmails);

    this.emailSettingsFormGroup = new FormGroup({
      sendEmails: new FormControl(
        this.emailSettings ? this.emailSettings.sendEmails : false,
        Validators.required
      ),
      smtpHost: new FormControl(
        {
          value: this.emailSettings ? this.emailSettings.smtpHost : '',
          disabled: isDisabled,
        },
        Validators.required
      ),
      smtpPort: new FormControl(
        {
          value: this.emailSettings ? this.emailSettings.smtpPort : '',
          disabled: isDisabled,
        },
        Validators.required
      ),
      smtpUsername: new FormControl({
        value: this.emailSettings ? this.emailSettings.smtpUsername : '',
        disabled: isDisabled,
      }),
      smtpPassword: new FormControl({
        value: this.emailSettings ? this.emailSettings.smtpPassword : '',
        disabled: isDisabled,
      }),
      smtpTransportStrategy: new FormControl(
        {
          value: this.emailSettings
            ? this.emailSettings.smtpTransportStrategy
            : '',
          disabled: isDisabled,
        },
        Validators.required
      ),
      fromAddress: new FormControl(
        {
          value: this.emailSettings ? this.emailSettings.fromAddress : '',
          disabled: isDisabled,
        },
        [Validators.required, Validators.email]
      ),
      fromName: new FormControl(
        {
          value: this.emailSettings ? this.emailSettings.fromName : '',
          disabled: isDisabled,
        },
        Validators.required
      ),
    });
  }
}

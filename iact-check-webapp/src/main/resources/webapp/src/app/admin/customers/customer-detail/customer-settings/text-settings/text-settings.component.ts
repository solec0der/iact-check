import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextMessageSettingsDTO } from '../../../../shared/dtos/text-message-settings-dto';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../shared/services/customer.service';
import { TextMessageSettingsService } from '../../../../shared/services/text-message-settings.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-settings.component.html',
  styleUrls: ['./text-settings.component.scss'],
})
export class TextSettingsComponent implements OnInit {
  public textMessageSettingsFromGroup!: FormGroup;
  public textMessageSettings!: TextMessageSettingsDTO;

  public hideAuthToken = true;

  private customerId = -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private textMessageSettingsService: TextMessageSettingsService
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
    if (this.textMessageSettings) {
      this.updateTextMessageSettings();
    } else {
      this.createTextMessageSettings();
    }
  }

  public toggleSendTextMessages(event: MatSlideToggleChange): void {
    for (let controlsKey in this.textMessageSettingsFromGroup.controls) {
      if (event.checked) {
        this.textMessageSettingsFromGroup.controls[controlsKey].enable();
      } else {
        this.textMessageSettingsFromGroup.controls[controlsKey].disable();
      }
    }
    this.textMessageSettingsFromGroup.get('sendTextMessages')?.enable();
  }

  private createTextMessageSettings(): void {
    const textMessageSettingsDTO = this.createTextMessageSettingsFromFormGroup();

    this.textMessageSettingsService
      .createTextMessageSettingsByCustomerId(
        this.customerId,
        textMessageSettingsDTO
      )
      .subscribe((textMessageSettingsDTO) => {
        this.textMessageSettings = textMessageSettingsDTO;
        this.createTextMessageSettingsFormGroup();
      });
  }

  private updateTextMessageSettings(): void {
    const textMessageSettingsDTO = this.createTextMessageSettingsFromFormGroup();

    this.textMessageSettingsService
      .updateTextMessageSettingsByCustomerId(
        this.customerId,
        textMessageSettingsDTO
      )
      .subscribe((textMessageSettingsDTO) => {
        this.textMessageSettings = textMessageSettingsDTO;
        this.createTextMessageSettingsFormGroup();
      });
  }

  private createTextMessageSettingsFromFormGroup(): TextMessageSettingsDTO {
    if (this.textMessageSettingsFromGroup.value.sendTextMessages) {
      return {
        sendTextMessages: this.textMessageSettingsFromGroup.value
          .sendTextMessages,
        accountSid: this.textMessageSettingsFromGroup.value.accountSid,
        authToken: this.textMessageSettingsFromGroup.value.authToken,
        fromPhoneNumber: this.textMessageSettingsFromGroup.value
          .fromPhoneNumber,
      };
    } else {
      this.textMessageSettings.sendTextMessages = false;
      return this.textMessageSettings;
    }
  }

  private loadData(): void {
    this.textMessageSettingsService
      .getTextMessageSettingsByCustomerId(this.customerId)
      .subscribe((textMessageSettings) => {
        this.textMessageSettings = textMessageSettings;
        this.createTextMessageSettingsFormGroup();
      });
  }

  private createTextMessageSettingsFormGroup() {
    const isDisabled = this.textMessageSettings
      ? !this.textMessageSettings.sendTextMessages
      : true;

    this.textMessageSettingsFromGroup = new FormGroup({
      sendTextMessages: new FormControl(
        this.textMessageSettings
          ? this.textMessageSettings.sendTextMessages
          : false,
        Validators.required
      ),
      accountSid: new FormControl(
        {
          value: this.textMessageSettings
            ? this.textMessageSettings.accountSid
            : '',
          disabled: isDisabled,
        },
        Validators.required
      ),
      authToken: new FormControl(
        {
          value: this.textMessageSettings
            ? this.textMessageSettings.authToken
            : '',
          disabled: isDisabled,
        },
        Validators.required
      ),
      fromPhoneNumber: new FormControl(
        {
          value: this.textMessageSettings
            ? this.textMessageSettings.fromPhoneNumber
            : '',
          disabled: isDisabled,
        },
        Validators.required
      ),
    });
  }
}

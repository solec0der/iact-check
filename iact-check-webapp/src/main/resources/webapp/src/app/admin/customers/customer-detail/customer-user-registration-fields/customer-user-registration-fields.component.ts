import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerDTO } from '../../../../shared/dtos/customer-dto';
import { UserRegistrationFieldService } from '../../../shared/services/user-registration-field.service';
import { UserRegistrationFieldsDTO } from '../../../../shared/dtos/user-registration-fields-dto';
import { ActiveUserRegistrationFieldDTO } from '../../../../shared/dtos/active-user-registration-field-dto';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-customer-user-registration-fields',
  templateUrl: './customer-user-registration-fields.component.html',
  styleUrls: ['./customer-user-registration-fields.component.scss'],
})
export class CustomerUserRegistrationFieldsComponent implements OnInit {
  @Input('customerUserRegistrationFieldFormArray')
  public customerUserRegistrationFieldFormArray!: FormArray;
  @Input('customer') public customerDTO!: CustomerDTO;

  public userRegistrationFields!: UserRegistrationFieldsDTO;

  constructor(
    private userRegistrationFieldService: UserRegistrationFieldService
  ) {}

  ngOnInit(): void {
    this.userRegistrationFieldService
      .getUserRegistrationFields()
      .subscribe((userRegistrationFields) => {
        this.userRegistrationFields = userRegistrationFields;
        this.createUserRegistrationFieldFormGroups();
      });
  }

  public toggleFormGroup(event: MatSlideToggleChange, index: number): void {
    if (event.checked) {
      this.customerUserRegistrationFieldFormArray
        .at(index)
        .get('validationRegex')
        ?.enable();
    } else {
      this.customerUserRegistrationFieldFormArray
        .at(index)
        .get('validationRegex')
        ?.disable();
    }
  }

  private createUserRegistrationFieldFormGroups(): void {
    this.userRegistrationFields.userRegistrationFields.forEach(
      (userRegistrationField) => {
        const activeUserRegistrationField = this.getActiveUserRegistrationFieldByUserRegistrationFieldId(
          userRegistrationField.id
        );

        const formGroup = new FormGroup({
          validationRegex: new FormControl(
            {
              value: activeUserRegistrationField
                ? activeUserRegistrationField.validationRegex
                : '.*',
              disabled: !activeUserRegistrationField,
            },
            Validators.required
          ),
          userRegistrationFieldId: new FormControl(userRegistrationField.id),
          active: new FormControl(!!activeUserRegistrationField),
        });

        this.customerUserRegistrationFieldFormArray.push(formGroup);
      }
    );
  }

  private getActiveUserRegistrationFieldByUserRegistrationFieldId(
    userRegistrationFieldId: number
  ): ActiveUserRegistrationFieldDTO | undefined {
    return this.customerDTO.activeUserRegistrationFields.find(
      (u) => u.userRegistrationFieldId === userRegistrationFieldId
    );
  }
}

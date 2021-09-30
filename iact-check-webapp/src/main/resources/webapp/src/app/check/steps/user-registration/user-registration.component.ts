import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerDTO } from '../../../admin/shared/dtos/customer-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationFieldService } from '../../../admin/shared/services/user-registration-field.service';
import { UserRegistrationFieldsDTO } from '../../../admin/shared/dtos/user-registration-fields-dto';
import { USER_REGISTRATION_FIELD_MAPPING } from '../../../shared/model/user-registration-field-mappings';
import { CheckDTO } from '../../../admin/shared/dtos/check-dto';
import { SubmissionService } from '../../../shared/services/submission.service';
import { Steps } from '../steps';
import {SubmissionDTO} from "../../../shared/dtos/submission-dto";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  public checkDTO!: CheckDTO;
  public customerDTO!: CustomerDTO;
  public userRegistrationFormGroup!: FormGroup;
  private userRegistrationFields!: UserRegistrationFieldsDTO;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService,
    private readonly submissionService: SubmissionService,
    private readonly userRegistrationFieldService: UserRegistrationFieldService
  ) {}

  ngOnInit(): void {
    this.checkStateService.setStep(Steps.UserRegistration, this.activatedRoute);
    this.loadData();

    if (this.checkStateService.submission) {
      this.checkStateService.nextStep(this.activatedRoute);
    }
  }

  public previousStep(): void {
    this.checkStateService.previousStep(this.activatedRoute);
  }

  public nextStep(): void {
    this.saveUserRegistration();
  }

  private saveUserRegistration(): void {
    const submission = {
      correlatingCheckId: this.checkDTO.id!,
      firstName: this.userRegistrationFormGroup.value.firstName,
      lastName: this.userRegistrationFormGroup.value.lastName,
      street: this.userRegistrationFormGroup.value.street,
      zipCode: this.userRegistrationFormGroup.value.zipCode,
      city: this.userRegistrationFormGroup.value.city,
      phoneNumber: this.userRegistrationFormGroup.value.phoneNumber,
      email: this.userRegistrationFormGroup.value.email,
      rangeQuestionAnswers: [],
      bookmarkedPossibleOutcomes: []
    };

    this.submissionService
      .createSubmission(submission)
      .subscribe((submission) => {
        this.checkStateService.submission = submission;
        this.checkStateService.nextStep(this.activatedRoute);
      });
  }

  private loadData(): void {
    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO;
    });

    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });

    this.userRegistrationFieldService
      .getUserRegistrationFields()
      .subscribe((userRegistrationFields) => {
        this.userRegistrationFields = userRegistrationFields;
        this.createUserRegistrationForm();
      });
  }

  private createUserRegistrationForm(): void {
    this.userRegistrationFormGroup = new FormGroup({});

    this.userRegistrationFields.userRegistrationFields.forEach(
      (userRegistrationField) => {
        const formControlName =
          USER_REGISTRATION_FIELD_MAPPING[userRegistrationField.fieldName]
            .formControlName;

        const activeUserRegistrationField = this.customerDTO.activeUserRegistrationFields.find(
          (field) => field.userRegistrationFieldId === userRegistrationField.id
        );

        if (activeUserRegistrationField) {
          this.userRegistrationFormGroup.addControl(
            formControlName,
            new FormControl(
              '',
              Validators.pattern(activeUserRegistrationField.validationRegex)
            )
          );
        }
      }
    );
  }
}

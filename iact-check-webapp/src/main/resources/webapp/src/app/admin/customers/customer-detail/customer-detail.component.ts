import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerDTO } from '../../../shared/dtos/customer-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ActiveCustomerService } from '../../shared/services/active-customer.service';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColourUtility } from '../../../shared/utils/colour.utility';
import { map, mergeMap } from 'rxjs/operators';
import { FileReaderUtil } from '../../shared/util/file-reader.util';
import { ActiveUserRegistrationFieldDTO } from '../../../shared/dtos/active-user-registration-field-dto';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  public action: string = '';
  public customerId: number = -1;
  public customerFormGroup!: FormGroup;
  public customerBrandingFormGroup!: FormGroup;
  public customerUserRegistrationFieldsFormArray!: FormArray;
  public usersWithAccess: string[] = [];

  public logo!: File;
  public customerDTO!: CustomerDTO;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private activeCustomerService: ActiveCustomerService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      this.loadData();
    } else {
      this.createCustomerFromGroup();
    }
    this.createCustomerUserRegistrationFieldsFormArray();
  }

  public save(): void {
    if (this.action === 'create') {
      this.createCustomer();
    } else if (this.action === 'edit') {
      this.updateCustomer();
    }
  }

  public showCustomerDeletionDialog(): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('CUSTOMERS.DELETION_DIALOG.TITLE'),
        message: this.translateService.instant('CUSTOMERS.DELETION_DIALOG.MESSAGE'),
        buttonTextCancel: this.translateService.instant('CUSTOMERS.DELETION_DIALOG.BUTTON_TEXT_CANCEL'),
        buttonTextConfirm: this.translateService.instant('CUSTOMERS.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deleteCustomer();
      }
    });
  }

  private deleteCustomer() {
    this.customerService.deleteCustomerById(<number>this.customerDTO.id).subscribe((_) => {
      this.matSnackBar.open(
        this.translateService.instant('CUSTOMERS.DELETED_MESSAGE'),
        this.translateService.instant('SHARED.CLOSE'),
        {
          duration: 5000,
        }
      );
      this.router.navigate(['admin', 'customers']).then();
    });
  }

  private loadData(): void {
    this.customerService
      .getCustomerById(this.customerId)
      .pipe(
        map((customerDTO) => {
          this.customerDTO = customerDTO;
          this.usersWithAccess = customerDTO.usersWithAccess;
          this.activeCustomerService.setActiveCustomer(customerDTO);
          return customerDTO;
        }),
        mergeMap(() => {
          return this.customerService.getLogoByCustomerId(this.customerId);
        })
      )
      .subscribe((logo) => {
        this.logo = FileReaderUtil.convertBlobToFile(logo, this.customerDTO.name + '.png');
        this.createCustomerFromGroup();
        this.createCustomerBrandingFormGroup();
      });
  }

  private createCustomer(): void {
    const customerDTO: CustomerDTO = {
      name: this.customerFormGroup.value.name,
      usersWithAccess: this.usersWithAccess,
      activeUserRegistrationFields: [],
    };

    this.customerService.createCustomer(customerDTO).subscribe((response) => {
      this.customerDTO = response;

      this.activeCustomerService.setActiveCustomer(response);

      this.router.navigate(['admin', 'customers', response.id, 'edit']).then(() => {
        this.createCustomerFromGroup();
        this.createCustomerBrandingFormGroup();

        this.matSnackBar.open(
          this.translateService.instant('CUSTOMERS.CREATED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
      });
    });
  }

  private updateCustomer(): void {
    const customerDTO: CustomerDTO = {
      name: this.customerFormGroup.value.name,
      usersWithAccess: this.usersWithAccess,
      activeUserRegistrationFields: this.getActiveUserRegistrationFieldsFromFormArray(
        this.customerUserRegistrationFieldsFormArray
      ),
      customerBranding: {
        id: this.customerDTO.customerBranding?.id!,
        customerId: this.customerId,
        primaryColour: '#' + this.customerBrandingFormGroup.value.primaryColour.hex,
        backgroundColour: '#' + this.customerBrandingFormGroup.value.backgroundColour.hex,
        accentColour: '#' + this.customerBrandingFormGroup.value.accentColour.hex,
        textColour: '#' + this.customerBrandingFormGroup.value.textColour.hex,
        font: this.customerBrandingFormGroup.value.font,
        theme: this.customerBrandingFormGroup.value.theme,
      },
    };

    this.customerService
      .updateCustomerById(this.customerId, customerDTO)
      .pipe(
        map((updatedCustomer) => {
          return updatedCustomer;
        }),
        mergeMap((updatedCustomer) => {
          return this.customerService.uploadLogoByCustomerId(
            <number>updatedCustomer.id,
            this.customerBrandingFormGroup.value.logo
          );
        })
      )
      .subscribe(() => {
        this.loadData();

        this.matSnackBar.open(
          this.translateService.instant('CUSTOMERS.UPDATED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
      });
  }

  private getActiveUserRegistrationFieldsFromFormArray(
    userRegistrationFieldFormArray: FormArray
  ): ActiveUserRegistrationFieldDTO[] {
    const activeUserRegistrationFields: ActiveUserRegistrationFieldDTO[] = [];
    userRegistrationFieldFormArray.controls.forEach((formGroup) => {
      if (formGroup.get('active')?.value) {
        activeUserRegistrationFields.push({
          id: -1,
          userRegistrationFieldId: formGroup.value.userRegistrationFieldId,
          position: 1,
          validationRegex: formGroup.value.validationRegex,
        });
      }
    });
    return activeUserRegistrationFields;
  }

  private createCustomerFromGroup(): void {
    this.customerFormGroup = new FormGroup({
      name: new FormControl(this.action === 'edit' ? this.customerDTO?.name : '', Validators.required),
    });
  }

  private createCustomerBrandingFormGroup(): void {
    const primaryColour = ColourUtility.convertHexToColor(
      this.customerDTO.customerBranding ? this.customerDTO.customerBranding.primaryColour : null
    );
    const backgroundColour = ColourUtility.convertHexToColor(
      this.customerDTO.customerBranding ? this.customerDTO.customerBranding.backgroundColour : null
    );
    const accentColour = ColourUtility.convertHexToColor(
      this.customerDTO.customerBranding ? this.customerDTO.customerBranding.accentColour : null
    );
    const textColour = ColourUtility.convertHexToColor(
      this.customerDTO.customerBranding ? this.customerDTO.customerBranding.textColour : null
    );

    this.customerBrandingFormGroup = new FormGroup({
      logo: new FormControl(this.logo && this.logo.size > 0 ? this.logo : new File([], ''), Validators.required),
      primaryColour: new FormControl(this.customerDTO.customerBranding ? primaryColour : '', Validators.required),
      backgroundColour: new FormControl(this.customerDTO.customerBranding ? backgroundColour : '', Validators.required),
      accentColour: new FormControl(this.customerDTO.customerBranding ? accentColour : '', Validators.required),
      textColour: new FormControl(this.customerDTO.customerBranding ? textColour : '', Validators.required),
      font: new FormControl(
        this.customerDTO.customerBranding ? this.customerDTO.customerBranding.font : '',
        Validators.required
      ),
      theme: new FormControl(
        this.customerDTO.customerBranding ? this.customerDTO.customerBranding.theme : '',
        Validators.required
      ),
    });
  }

  private createCustomerUserRegistrationFieldsFormArray(): void {
    this.customerUserRegistrationFieldsFormArray = new FormArray([]);
  }
}

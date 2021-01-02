import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../shared/services/user.service';
import { CustomerService } from '../../shared/services/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { CustomerDTO } from '../../shared/dtos/customer-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AVAILABLE_FONTS } from '../../../shared/model/available-fonts';
import { ColourUtility } from '../../../shared/utils/colour.utility';
import { map, mergeMap } from 'rxjs/operators';
import { FileReaderUtil } from '../../shared/util/file-reader.util';
import { CustomerBrandingDTO } from '../../shared/dtos/customer-branding-dto';
import { CORE_URL } from '../../../app.config';

@Component({
  selector: 'app-customer-branding',
  templateUrl: './customer-branding.component.html',
  styleUrls: ['./customer-branding.component.scss'],
})
export class CustomerBrandingComponent implements OnInit {
  public customerId = -1;
  public customerDTO!: CustomerDTO;
  public customerBrandingFormGroup!: FormGroup;

  public logo!: File;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);
    this.loadData();
  }

  public get availableFonts(): string[] {
    return AVAILABLE_FONTS;
  }

  public save(): void {
    if (!this.customerDTO.customerBranding) {
      this.createCustomerBranding();
    } else {
      this.updateCustomerBranding();
    }
  }

  public showLogo(): void {
    window.open(
      CORE_URL + '/api/customers/' + this.customerId + '/branding/logo',
      '_blank'
    );
  }

  private createCustomerBranding(): void {
    const customerBrandingDTO: CustomerBrandingDTO = {
      id: -1,
      customerId: this.customerId,
      primaryColour: '#' + this.customerBrandingFormGroup.value.primaryColour.hex,
      backgroundColour: '#' + this.customerBrandingFormGroup.value.backgroundColour
        .hex,
      accentColour: '#' + this.customerBrandingFormGroup.value.accentColour.hex,
      textColour: '#' + this.customerBrandingFormGroup.value.textColour.hex,
      font: this.customerBrandingFormGroup.value.font,
    };

    this.customerService
      .createCustomerBranding(this.customerId, customerBrandingDTO)
      .pipe(
        map((createdCustomerBranding) => {
          this.customerDTO.customerBranding = createdCustomerBranding;
          return createdCustomerBranding;
        }),
        mergeMap((createdCustomerBranding) => {
          return this.customerService.uploadLogoByCustomerId(
            createdCustomerBranding.customerId,
            this.customerBrandingFormGroup.value.logo
          );
        })
      )
      .subscribe(() => {
        this.loadData();
      });
  }

  private updateCustomerBranding(): void {
    const customerBrandingDTO: CustomerBrandingDTO = {
      id: this.customerDTO.customerBranding?.id!,
      customerId: this.customerId,
      primaryColour: '#' + this.customerBrandingFormGroup.value.primaryColour.hex,
      backgroundColour: '#' + this.customerBrandingFormGroup.value.backgroundColour
        .hex,
      accentColour: '#' + this.customerBrandingFormGroup.value.accentColour.hex,
      textColour: '#' + this.customerBrandingFormGroup.value.textColour.hex,
      font: this.customerBrandingFormGroup.value.font,
    };

    this.customerService
      .updateCustomerBrandingByCustomerId(this.customerId, customerBrandingDTO)
      .pipe(
        map((updatedCustomerBranding) => {
          this.customerDTO.customerBranding = updatedCustomerBranding;
          return updatedCustomerBranding;
        }),
        mergeMap((updatedCustomerBranding) => {
          return this.customerService.uploadLogoByCustomerId(
            updatedCustomerBranding.customerId,
            this.customerBrandingFormGroup.value.logo
          );
        })
      )
      .subscribe(() => {
        this.loadData();
      });
  }

  private loadData(): void {
    this.customerService
      .getCustomerById(this.customerId)
      .pipe(
        map((customerDTO) => {
          this.customerDTO = customerDTO;
          return customerDTO;
        }),
        mergeMap(() => {
          return this.customerService.getLogoByCustomerId(this.customerId);
        })
      )
      .subscribe((logo) => {
        this.logo = FileReaderUtil.convertBlobToFile(
          logo,
          this.customerDTO.name + '.png'
        );
        this.createCustomerBrandingFormGroup();
      });
  }

  private createCustomerBrandingFormGroup(): void {
    const primaryColour = ColourUtility.convertHexToColor(
      this.customerDTO.customerBranding
        ? this.customerDTO.customerBranding.primaryColour
        : null
    );
    const backgroundColour = ColourUtility.convertHexToColor(
      this.customerDTO.customerBranding
        ? this.customerDTO.customerBranding.backgroundColour
        : null
    );
    const accentColour = ColourUtility.convertHexToColor(
      this.customerDTO.customerBranding
        ? this.customerDTO.customerBranding.accentColour
        : null
    );
    const textColour = ColourUtility.convertHexToColor(
      this.customerDTO.customerBranding
        ? this.customerDTO.customerBranding.textColour
        : null
    );

    this.customerBrandingFormGroup = new FormGroup({
      logo: new FormControl(
        this.logo && this.logo.size > 0 ? this.logo : new File([], ''),
        Validators.required
      ),
      primaryColour: new FormControl(
        this.customerDTO.customerBranding ? primaryColour : '',
        Validators.required
      ),
      backgroundColour: new FormControl(
        this.customerDTO.customerBranding ? backgroundColour : '',
        Validators.required
      ),
      accentColour: new FormControl(
        this.customerDTO.customerBranding ? accentColour : '',
        Validators.required
      ),
      textColour: new FormControl(
        this.customerDTO.customerBranding ? textColour : '',
        Validators.required
      ),
      font: new FormControl(
        this.customerDTO.customerBranding
          ? this.customerDTO.customerBranding.font
          : '',
        Validators.required
      ),
    });
  }
}

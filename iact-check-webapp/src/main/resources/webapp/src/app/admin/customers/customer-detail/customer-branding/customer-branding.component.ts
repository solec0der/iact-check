import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../shared/services/user.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerDTO } from '../../../shared/dtos/customer-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AVAILABLE_FONTS } from '../../../../shared/model/available-fonts';
import { ColourUtility } from '../../../../shared/utils/colour.utility';
import { map, mergeMap } from 'rxjs/operators';
import { FileReaderUtil } from '../../../shared/util/file-reader.util';
import { CustomerBrandingDTO } from '../../../shared/dtos/customer-branding-dto';
import { CORE_URL } from '../../../../app.config';

@Component({
  selector: 'app-customer-branding',
  templateUrl: './customer-branding.component.html',
  styleUrls: ['./customer-branding.component.scss'],
})
export class CustomerBrandingComponent implements OnInit {
  @Input('logo') public logo!: File;

  @Input('customerBrandingFormGroup')
  public customerBrandingFormGroup!: FormGroup;
  @Input('customer') public customerDTO!: CustomerDTO;

  public customerId = -1;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {}

  public get availableFonts(): string[] {
    return AVAILABLE_FONTS;
  }

  public showLogo(): void {
    window.open(
      CORE_URL + '/api/customers/' + this.customerId + '/branding/logo',
      '_blank'
    );
  }

  // private updateCustomerBranding(): void {
  //   const customerBrandingDTO: CustomerBrandingDTO = {
  //     id: this.customerDTO.customerBranding?.id!,
  //     customerId: this.customerId,
  //     primaryColour:
  //       '#' + this.customerBrandingFormGroup.value.primaryColour.hex,
  //     backgroundColour:
  //       '#' + this.customerBrandingFormGroup.value.backgroundColour.hex,
  //     accentColour: '#' + this.customerBrandingFormGroup.value.accentColour.hex,
  //     textColour: '#' + this.customerBrandingFormGroup.value.textColour.hex,
  //     font: this.customerBrandingFormGroup.value.font,
  //   };
  //
  //   this.customerService
  //     .updateCustomerBrandingByCustomerId(this.customerId, customerBrandingDTO)
  //     .pipe(
  //       map((updatedCustomerBranding) => {
  //         this.customerDTO.customerBranding = updatedCustomerBranding;
  //         return updatedCustomerBranding;
  //       }),
  //       mergeMap((updatedCustomerBranding) => {
  //         return this.customerService.uploadLogoByCustomerId(
  //           updatedCustomerBranding.customerId,
  //           this.customerBrandingFormGroup.value.logo
  //         );
  //       })
  //     )
  //     .subscribe(() => {
  //     });
  // }
}

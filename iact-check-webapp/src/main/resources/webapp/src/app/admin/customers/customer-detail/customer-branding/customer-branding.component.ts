import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../shared/services/user.service';
import { CustomerDTO } from '../../../../shared/dtos/customer-dto';
import { FormGroup } from '@angular/forms';
import { AVAILABLE_FONTS } from '../../../../shared/model/available-fonts';
import { CORE_URL } from '../../../../app.config';
import { Theme } from '../../../../shared/model/theme';

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

  public get availableThemes(): Theme[] {
    return [Theme.LIGHT, Theme.DARK];
  }

  public showLogo(): void {
    window.open(CORE_URL + '/api/customers/' + this.customerId + '/branding/logo', '_blank');
  }
}

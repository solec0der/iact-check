import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../shared/services/customer.service';
import { CustomerDTO } from '../../shared/dtos/customer-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  public action: string = '';
  public customerId: number = -1;
  private customerDTO: CustomerDTO | undefined;

  public customerFormGroup: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {
    this.createCustomerFromGroup();
  }

  public save(): void {
    if (this.action === 'create') {
      this.createCustomer();
    }
  }

  private createCustomer(): void {
    const customerDTO: CustomerDTO = {
      name: this.customerFormGroup.value.name,
      primaryColour: '#' + this.customerFormGroup.value.primaryColour.hex,
      accentColour: '#' + this.customerFormGroup.value.accentColour.hex,
      usersWithAccess: [],
    };

    this.customerService.createCustomer(customerDTO).subscribe((response) => {
      this.router
        .navigate(['admin', 'customers', response.id, 'edit'])
        .then(() => {
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

  private createCustomerFromGroup(): void {
    this.customerFormGroup = new FormGroup({
      name: new FormControl(
        this.action === 'edit' ? this.customerDTO?.name : '',
        Validators.required
      ),
      primaryColour: new FormControl(
        this.action === 'edit' ? this.customerDTO?.primaryColour : '',
        Validators.required
      ),
      accentColour: new FormControl(
        this.action === 'edit' ? this.customerDTO?.accentColour : '',
        Validators.required
      ),
    });
  }
}

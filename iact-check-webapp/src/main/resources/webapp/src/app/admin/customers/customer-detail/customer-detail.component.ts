import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  public action: string = '';
  public customerId: number = -1;

  public customerFormGroup: FormGroup = new FormGroup({});

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {
    this.createCustomerFromGroup();
  }

  public save(): void {}

  private createCustomerFromGroup(): void {
    this.customerFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      primaryColour: new FormControl('', Validators.required),
      accentColour: new FormControl('', Validators.required),
    });
  }
}

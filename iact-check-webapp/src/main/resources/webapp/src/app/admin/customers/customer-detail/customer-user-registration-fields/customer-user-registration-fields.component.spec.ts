import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUserRegistrationFieldsComponent } from './customer-user-registration-fields.component';

describe('CustomerUserRegistrationFieldsComponent', () => {
  let component: CustomerUserRegistrationFieldsComponent;
  let fixture: ComponentFixture<CustomerUserRegistrationFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerUserRegistrationFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUserRegistrationFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

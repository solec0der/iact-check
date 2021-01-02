import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBrandingComponent } from './customer-branding.component';

describe('CustomerBrandingComponent', () => {
  let component: CustomerBrandingComponent;
  let fixture: ComponentFixture<CustomerBrandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBrandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEnterDialogComponent } from './email-enter-dialog.component';

describe('EmailEnterDialogComponent', () => {
  let component: EmailEnterDialogComponent;
  let fixture: ComponentFixture<EmailEnterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEnterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEnterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

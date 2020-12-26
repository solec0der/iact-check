import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpExceptionDialogComponent } from './http-exception-dialog.component';

describe('HttpExceptionDialogComponent', () => {
  let component: HttpExceptionDialogComponent;
  let fixture: ComponentFixture<HttpExceptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpExceptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpExceptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

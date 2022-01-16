import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartConfirmDialogComponent } from './shopping-cart-confirm-dialog.component';

describe('ShoppingCartConfirmDialogComponent', () => {
  let component: ShoppingCartConfirmDialogComponent;
  let fixture: ComponentFixture<ShoppingCartConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

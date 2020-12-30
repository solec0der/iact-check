import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibleOutcomeDetailComponent } from './possible-outcome-detail.component';

describe('PossibleOutcomeDetailComponent', () => {
  let component: PossibleOutcomeDetailComponent;
  let fixture: ComponentFixture<PossibleOutcomeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PossibleOutcomeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PossibleOutcomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

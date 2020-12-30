import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibleOutcomeListComponent } from './possible-outcome-list.component';

describe('PossibleOutcomeListComponent', () => {
  let component: PossibleOutcomeListComponent;
  let fixture: ComponentFixture<PossibleOutcomeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PossibleOutcomeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PossibleOutcomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

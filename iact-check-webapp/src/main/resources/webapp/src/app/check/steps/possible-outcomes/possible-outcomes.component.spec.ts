import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibleOutcomesComponent } from './possible-outcomes.component';

describe('PossibleOutcomesComponent', () => {
  let component: PossibleOutcomesComponent;
  let fixture: ComponentFixture<PossibleOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PossibleOutcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PossibleOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeQuestionDetailComponent } from './range-question-detail.component';

describe('RangeQuestionDetailComponent', () => {
  let component: RangeQuestionDetailComponent;
  let fixture: ComponentFixture<RangeQuestionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeQuestionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

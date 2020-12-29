import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeQuestionListComponent } from './range-question-list.component';

describe('QuestionListComponent', () => {
  let component: RangeQuestionListComponent;
  let fixture: ComponentFixture<RangeQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeQuestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

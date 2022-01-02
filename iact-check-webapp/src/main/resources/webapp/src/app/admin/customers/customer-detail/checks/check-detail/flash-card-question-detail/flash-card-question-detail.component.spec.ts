import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardQuestionDetailComponent } from './flash-card-question-detail.component';

describe('FlashCardQuestionDetailComponent', () => {
  let component: FlashCardQuestionDetailComponent;
  let fixture: ComponentFixture<FlashCardQuestionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashCardQuestionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashCardQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardQuestionListComponent } from './flash-card-question-list.component';

describe('FlashCardQuestionListComponent', () => {
  let component: FlashCardQuestionListComponent;
  let fixture: ComponentFixture<FlashCardQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashCardQuestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashCardQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

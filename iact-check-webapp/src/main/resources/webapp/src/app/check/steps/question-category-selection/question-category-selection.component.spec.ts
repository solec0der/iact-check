import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCategorySelectionComponent } from './question-category-selection.component';

describe('QuestionCategorySelectionComponent', () => {
  let component: QuestionCategorySelectionComponent;
  let fixture: ComponentFixture<QuestionCategorySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCategorySelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCategorySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

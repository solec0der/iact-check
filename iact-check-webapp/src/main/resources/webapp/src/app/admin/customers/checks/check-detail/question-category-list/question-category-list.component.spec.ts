import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCategoryListComponent } from './question-category-list.component';

describe('QuestionCategoryListComponent', () => {
  let component: QuestionCategoryListComponent;
  let fixture: ComponentFixture<QuestionCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

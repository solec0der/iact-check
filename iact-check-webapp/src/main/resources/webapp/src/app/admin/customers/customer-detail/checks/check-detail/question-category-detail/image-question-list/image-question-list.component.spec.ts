import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageQuestionListComponent } from './image-question-list.component';

describe('ImageQuestionListComponent', () => {
  let component: ImageQuestionListComponent;
  let fixture: ComponentFixture<ImageQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageQuestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

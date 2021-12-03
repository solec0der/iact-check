import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageQuestionDetailComponent } from './image-question-detail.component';

describe('ImageQuestionDetailComponent', () => {
  let component: ImageQuestionDetailComponent;
  let fixture: ComponentFixture<ImageQuestionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageQuestionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

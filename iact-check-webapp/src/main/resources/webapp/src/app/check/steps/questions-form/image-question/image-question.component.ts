import { Component, Input, OnInit } from '@angular/core';
import { CheckDTO } from '../../../../shared/dtos/check-dto';
import { QuestionCategoryDTO } from '../../../../shared/dtos/question-category-dto';

@Component({
  selector: 'app-image-question',
  templateUrl: './image-question.component.html',
  styleUrls: ['./image-question.component.scss'],
})
export class ImageQuestionComponent implements OnInit {
  @Input()
  public checkDTO!: CheckDTO;

  @Input()
  public questionCategoryDTO!: QuestionCategoryDTO;

  constructor() {}

  ngOnInit(): void {}
}

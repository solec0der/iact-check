import { Component, Input, OnInit } from '@angular/core';
import { QuestionCategoryDTO } from '../../../../../shared/dtos/question-category-dto';

@Component({
  selector: 'app-range-question-list',
  templateUrl: './range-question-list.component.html',
  styleUrls: ['./range-question-list.component.scss'],
})
export class RangeQuestionListComponent implements OnInit {
  @Input('questionCategory') public questionCategoryDTO!: QuestionCategoryDTO;

  public displayedColumnsRangeQuestions = ['id', 'questionText', 'actions'];

  constructor() {}

  ngOnInit(): void {}
}

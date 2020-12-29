import { Component, Input, OnInit } from '@angular/core';
import { QuestionCategoryDTO } from '../../../../../shared/dtos/question-category-dto';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  @Input('questionCategory') public questionCategoryDTO!: QuestionCategoryDTO;

  public displayedColumnsQuestions = [
    'id',
    'questionText',
    'minScore',
    'maxScore',
    'actions',
  ];

  constructor() {}

  ngOnInit(): void {}
}

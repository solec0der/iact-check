import { Component, Input, OnInit } from '@angular/core';
import { CheckDTO } from '../../../../shared/dtos/check-dto';

@Component({
  selector: 'app-question-category-list',
  templateUrl: './question-category-list.component.html',
  styleUrls: ['./question-category-list.component.scss'],
})
export class QuestionCategoryListComponent implements OnInit {
  @Input('check') public checkDTO!: CheckDTO;

  public displayedColumnsQuestionCategories = ['id', 'title', 'actions'];

  constructor() {}

  ngOnInit(): void {}
}

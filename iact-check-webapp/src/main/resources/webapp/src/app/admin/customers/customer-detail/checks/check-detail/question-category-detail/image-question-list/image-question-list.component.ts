import { Component, Input, OnInit } from '@angular/core';
import { QuestionCategoryDTO } from '../../../../../../../shared/dtos/question-category-dto';

@Component({
  selector: 'app-image-question-list',
  templateUrl: './image-question-list.component.html',
  styleUrls: ['./image-question-list.component.scss'],
})
export class ImageQuestionListComponent implements OnInit {
  @Input('questionCategory') public questionCategory!: QuestionCategoryDTO;

  public readonly displayedColumns = ['id', 'questionText', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  public showImageQuestionDeletionDialog(imageQuestionId: number): void {}
}

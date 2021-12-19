import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { ActivatedRoute } from '@angular/router';
import { CheckDTO } from '../../../shared/dtos/check-dto';
import { CORE_URL } from '../../../app.config';
import { QuestionCategoryDTO } from '../../../shared/dtos/question-category-dto';
import { Steps } from '../steps';

@Component({
  selector: 'app-question-category-selection',
  templateUrl: './question-category-selection.component.html',
  styleUrls: ['./question-category-selection.component.scss'],
})
export class QuestionCategorySelectionComponent implements OnInit {
  public checkDTO!: CheckDTO;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly checkStateService: CheckStateService) {}

  ngOnInit(): void {
    this.checkStateService.setStep(Steps.QuestionCategorySelection, this.activatedRoute);

    this.loadData();
  }

  public getWidthOfQuestionCategory(): string {
    if (this.checkDTO?.questionCategories.length === 1) {
      return '25%';
    }
    return 100 / this.checkDTO?.questionCategories.length - 4 + '%';
  }

  public selectQuestionCategory(questionCategory: QuestionCategoryDTO): void {
    this.checkStateService.setActiveQuestionCategory(questionCategory);
    this.nextStep();
  }

  public getQuestionCategoryThumbnailById(questionCategoryId: number): string {
    return CORE_URL + '/api/question-categories/' + questionCategoryId + '/thumbnail';
  }

  private nextStep(): void {
    this.checkStateService.setStep(Steps.QuestionsForm, this.activatedRoute);
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;

      if (this.checkDTO.questionCategories.length === 1) {
        this.selectQuestionCategory(this.checkDTO.questionCategories[0]);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { ActivatedRoute } from '@angular/router';
import { CheckDTO } from '../../../admin/shared/dtos/check-dto';
import { CORE_URL } from '../../../app.config';
import { QuestionCategoryDTO } from '../../../admin/shared/dtos/question-category-dto';

@Component({
  selector: 'app-question-category-selection',
  templateUrl: './question-category-selection.component.html',
  styleUrls: ['./question-category-selection.component.scss'],
})
export class QuestionCategorySelectionComponent implements OnInit {
  private readonly CURRENT_STEP = 3;

  public checkDTO!: CheckDTO;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.checkStateService.setStep(this.CURRENT_STEP, this.activatedRoute);
  }

  public getWidthOfQuestionCategory(): string {
    return 100 / this.checkDTO?.questionCategories.length - 4 + '%';
  }

  public selectQuestionCategory(questionCategory: QuestionCategoryDTO): void {
    this.checkStateService.setActiveQuestionCategory(questionCategory);
    this.nextStep();
  }

  public getQuestionCategoryThumbnailById(questionCategoryId: number): string {
    return (
      CORE_URL + '/api/question-categories/' + questionCategoryId + '/thumbnail'
    );
  }

  private nextStep(): void {
    this.checkStateService.nextStep(this.activatedRoute);
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });
  }
}

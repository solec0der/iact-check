import { Component, OnInit } from '@angular/core';
import { CheckDTO } from '../../../admin/shared/dtos/check-dto';
import { ActivatedRoute } from '@angular/router';
import { CheckStateService } from '../../check-state.service';
import { QuestionCategoryDTO } from '../../../admin/shared/dtos/question-category-dto';
import { CORE_URL } from '../../../app.config';
import { MatSliderChange } from '@angular/material/slider';
import { RangeQuestionDTO } from '../../../admin/shared/dtos/range-question-dto';
import { RangeQuestionAnswerDTO } from '../../../shared/dtos/range-question-answer-dto';
import { RangeStepDTO } from '../../../admin/shared/dtos/range-step-dto';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss'],
})
export class QuestionsFormComponent implements OnInit {
  private readonly CURRENT_STEP = 4;

  public checkDTO!: CheckDTO;
  public questionCategoryDTO!: QuestionCategoryDTO;
  private rangeQuestionAnswers: RangeQuestionAnswerDTO[] = [];

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

  public getIconUrlByRangeQuestionId(rangeQuestionId: number): string {
    return CORE_URL + '/api/range-questions/' + rangeQuestionId + '/icon';
  }

  public onSliderChange(
    event: MatSliderChange,
    changedQuestion: RangeQuestionDTO
  ): void {
    if (event.value !== null) {
      const foundRangeQuestionAnswer = this.rangeQuestionAnswers.find(
        (rangeQuestionAnswer) =>
          rangeQuestionAnswer.rangeQuestionId === changedQuestion.id
      );
      if (foundRangeQuestionAnswer) {
        foundRangeQuestionAnswer.value =
          changedQuestion.rangeSteps[event.value].score;
      }
    }
  }

  public getMiddleRangeStepOfRangeQuestion(
    rangeQuestion: RangeQuestionDTO
  ): RangeStepDTO {
    return rangeQuestion.rangeSteps[(rangeQuestion.rangeSteps.length - 1) / 2];
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });

    this.checkStateService
      .getActiveQuestionCategory()
      .subscribe((questionCategoryDTO) => {
        this.questionCategoryDTO = questionCategoryDTO;
        this.setupRangeQuestionAnswers();
      });
  }

  private setupRangeQuestionAnswers(): void {
    this.questionCategoryDTO.rangeQuestions.forEach((rangeQuestion) => {
      this.rangeQuestionAnswers.push({
        rangeQuestionId: rangeQuestion.id,
        value: this.getMiddleRangeStepOfRangeQuestion(rangeQuestion).score,
      });
    });
  }
}

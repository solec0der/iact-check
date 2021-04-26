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
import { SubmissionService } from '../../../shared/services/submission.service';
import { Steps } from '../steps';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss'],
})
export class QuestionsFormComponent implements OnInit {
  public checkDTO!: CheckDTO;
  public questionCategoryDTO!: QuestionCategoryDTO;
  private rangeQuestionAnswers: RangeQuestionAnswerDTO[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly submissionService: SubmissionService,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.setStep(Steps.QuestionsForm, this.activatedRoute);
    this.loadData();
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
        const rangeStep = changedQuestion.rangeSteps[event.value];
        event.source.displayWith = (_) => {
          return rangeStep.score;
        };
        foundRangeQuestionAnswer.value = rangeStep.score;
      }
    }
  }

  public getMiddleRangeStepOfRangeQuestion(
    rangeQuestion: RangeQuestionDTO
  ): RangeStepDTO {
    return rangeQuestion.rangeSteps[(rangeQuestion.rangeSteps.length - 1) / 2];
  }

  public previousStep(): void {
    this.checkStateService.previousStep(this.activatedRoute);
  }

  public nextStep(): void {
    this.saveRangeQuestionAnswers();
  }

  private saveRangeQuestionAnswers(): void {
    const rangeQuestionAnswers = [];
    const submission = this.checkStateService.submission;

    rangeQuestionAnswers.push(...this.rangeQuestionAnswers);

    if (submission && submission.rangeQuestionAnswers.length > 0) {
      rangeQuestionAnswers.push(...submission.rangeQuestionAnswers);
    }

    this.submissionService
      .addRangeQuestionAnswersToSubmission(
        <number>submission?.id,
        rangeQuestionAnswers
      )
      .subscribe((submission) => {
        this.checkStateService.submission = submission;
        this.checkStateService.nextStep(this.activatedRoute);
      });
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });

    this.checkStateService
      .getActiveQuestionCategory()
      .subscribe((questionCategoryDTO) => {
        this.questionCategoryDTO = questionCategoryDTO;
        this.checkIfQuestionsAreAlreadyAnswered();
        this.setupRangeQuestionAnswers();
      });
  }

  private checkIfQuestionsAreAlreadyAnswered(): void {
    const submission = this.checkStateService.submission;
    if (submission) {
      if (
        submission.rangeQuestionAnswers.find(
          (rangeQuestionAnswer) =>
            rangeQuestionAnswer.questionCategoryId ===
            this.questionCategoryDTO.id
        )
      ) {
        this.checkStateService.setStep(
          Steps.PossibleOutcomes,
          this.activatedRoute
        );
      }
    }
  }

  private setupRangeQuestionAnswers(): void {
    this.rangeQuestionAnswers = [];
    this.questionCategoryDTO.rangeQuestions.forEach((rangeQuestion) => {
      this.rangeQuestionAnswers.push({
        rangeQuestionId: rangeQuestion.id,
        value: this.getMiddleRangeStepOfRangeQuestion(rangeQuestion).score,
      });
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { RangeQuestionDTO } from '../../../../shared/dtos/range-question-dto';
import { CORE_URL } from '../../../../app.config';
import { RangeStepDTO } from '../../../../shared/dtos/range-step-dto';
import { Steps } from '../../steps';
import { SubmissionService } from '../../../../shared/services/submission.service';
import { CheckStateService } from '../../../check-state.service';
import { ActivatedRoute } from '@angular/router';
import { CheckDTO } from '../../../../shared/dtos/check-dto';
import { QuestionCategoryDTO } from '../../../../shared/dtos/question-category-dto';
import { RangeQuestionAnswerDTO } from '../../../../shared/dtos/range-question-answer-dto';
import { SubmissionDTO } from '../../../../shared/dtos/submission-dto';

@Component({
  selector: 'app-range-question',
  templateUrl: './range-question.component.html',
  styleUrls: ['./range-question.component.scss'],
})
export class RangeQuestionComponent implements OnInit {
  @Input()
  public checkDTO!: CheckDTO;

  @Input()
  public questionCategoryDTO!: QuestionCategoryDTO;

  private rangeQuestionAnswers: RangeQuestionAnswerDTO[] = [];
  private submission!: SubmissionDTO;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly submissionService: SubmissionService,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public getIconUrlByRangeQuestionId(rangeQuestionId: number): string {
    return CORE_URL + '/api/range-questions/' + rangeQuestionId + '/icon';
  }

  public onSliderChange(event: MatSliderChange, changedQuestion: RangeQuestionDTO): void {
    if (event.value !== null) {
      const foundRangeQuestionAnswer = this.rangeQuestionAnswers.find(
        (rangeQuestionAnswer) => rangeQuestionAnswer.rangeQuestionId === changedQuestion.id
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

  public getMiddleRangeStepOfRangeQuestion(rangeQuestion: RangeQuestionDTO): RangeStepDTO {
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

    rangeQuestionAnswers.push(...this.rangeQuestionAnswers);

    if (this.submission && this.submission.rangeQuestionAnswers.length > 0) {
      rangeQuestionAnswers.push(...this.submission.rangeQuestionAnswers);
    }

    this.submissionService
      .addRangeQuestionAnswersToSubmission(<number>this.submission?.id, rangeQuestionAnswers)
      .subscribe((updatedSubmission) => {
        this.checkStateService.setSubmission(updatedSubmission);
        this.checkStateService.nextStep(this.activatedRoute);
      });
  }

  private loadData(): void {
    this.checkStateService.getSubmission().subscribe((submission) => {
      this.submission = submission;
    });

    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });

    this.checkStateService.getActiveQuestionCategory().subscribe((questionCategoryDTO) => {
      this.questionCategoryDTO = questionCategoryDTO;
      this.checkIfQuestionsAreAlreadyAnswered();
      this.setupRangeQuestionAnswers();
    });
  }

  private checkIfQuestionsAreAlreadyAnswered(): void {
    if (
      this.submission.rangeQuestionAnswers.find(
        (rangeQuestionAnswer) => rangeQuestionAnswer.questionCategoryId === this.questionCategoryDTO.id
      )
    ) {
      this.checkStateService.setStep(Steps.PossibleOutcomes, this.activatedRoute);
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

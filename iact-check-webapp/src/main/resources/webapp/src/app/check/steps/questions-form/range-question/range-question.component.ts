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
import { range } from 'rxjs';

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
        const rangeStep = changedQuestion.rangeSteps[event.value - 1];
        foundRangeQuestionAnswer.value = rangeStep.score;
      }
    }
  }

  public getMiddleRangeStepOfRangeQuestion(rangeQuestion: RangeQuestionDTO): RangeStepDTO {
    return rangeQuestion.rangeSteps[(rangeQuestion.rangeSteps.length - 1) / 2];
  }

  public getSliderValueByQuestionId(questionId: number): number {
    const rangeQuestionAnswer = this.rangeQuestionAnswers.find((answer) => answer.rangeQuestionId === questionId);

    if (rangeQuestionAnswer) {
      return rangeQuestionAnswer.value;
    }
    return 0;
  }

  public getSliderBoundsByQuestionId(questionId: number) {
    const rangeQuestion = this.questionCategoryDTO.rangeQuestions.find((question) => question.id === questionId);

    if (rangeQuestion) {
      const scores = rangeQuestion.rangeSteps.map((rangeStep) => rangeStep.score).sort((a, b) => a - b);

      return {
        min: scores[0],
        max: scores[scores.length - 1],
      };
    }

    return {
      min: 0,
      max: 100,
    };
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
      this.submission.rangeQuestionAnswers.forEach((answer) => {
        if (this.rangeQuestionAnswers.every((_) => _.rangeQuestionId !== answer.rangeQuestionId)) {
          rangeQuestionAnswers.push(answer);
        }
      });
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
      this.setupRangeQuestionAnswers();
    });
  }

  private setupRangeQuestionAnswers(): void {
    if (this.submission.rangeQuestionAnswers && this.submission.rangeQuestionAnswers.length > 0) {
      this.rangeQuestionAnswers = this.submission.rangeQuestionAnswers;
    } else {
      this.rangeQuestionAnswers = [];
      this.questionCategoryDTO.rangeQuestions.forEach((rangeQuestion) => {
        this.rangeQuestionAnswers.push({
          rangeQuestionId: rangeQuestion.id,
          value: this.getMiddleRangeStepOfRangeQuestion(rangeQuestion).score,
        });
      });
    }
  }
}

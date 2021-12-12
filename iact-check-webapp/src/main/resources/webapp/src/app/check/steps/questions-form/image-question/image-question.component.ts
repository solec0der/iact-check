import { Component, Input, OnInit } from '@angular/core';
import { CheckDTO } from '../../../../shared/dtos/check-dto';
import { QuestionCategoryDTO } from '../../../../shared/dtos/question-category-dto';
import { ImageQuestionAnswerDTO } from '../../../../shared/dtos/image-question-answer-dto';
import { ActivatedRoute } from '@angular/router';
import { SubmissionService } from '../../../../shared/services/submission.service';
import { CheckStateService } from '../../../check-state.service';
import { CORE_URL } from '../../../../app.config';
import { ImageQuestionDTO } from '../../../../shared/dtos/image-question-dto';
import { SubmissionDTO } from '../../../../shared/dtos/submission-dto';

@Component({
  selector: 'app-image-question',
  templateUrl: './image-question.component.html',
  styleUrls: ['./image-question.component.scss'],
})
export class ImageQuestionComponent implements OnInit {
  @Input()
  public checkDTO!: CheckDTO;

  @Input()
  public questionCategoryDTO!: QuestionCategoryDTO;

  private imageQuestionAnswers: ImageQuestionAnswerDTO[] = [];
  private currentImageQuestionIndex = 0;
  private submission!: SubmissionDTO;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly submissionService: SubmissionService,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.getSubmission().subscribe((submission) => {
      this.submission = submission;
    });
  }

  public getImageUrlByImageAnswerId(imageAnswerId: number): string {
    return CORE_URL + '/api/image-questions/image-answers/' + imageAnswerId + '/image';
  }

  public selectImageAnswer(imageAnswerId: number): void {
    const index = this.imageQuestionAnswers.findIndex(
      (value) => value.imageQuestionId === this.getCurrentImageQuestion().id
    );
    if (index >= 0) {
      this.imageQuestionAnswers.splice(index, 1);
    }

    this.imageQuestionAnswers.push({
      imageQuestionId: <number>this.getCurrentImageQuestion().id,
      imageAnswerId: imageAnswerId,
      questionCategoryId: this.questionCategoryDTO.id,
    });
  }

  public isAnswerSelected(imageAnswerId: number): boolean {
    return this.imageQuestionAnswers.some((value) => value.imageAnswerId === imageAnswerId);
  }

  public getCurrentImageQuestion(): ImageQuestionDTO {
    return this.questionCategoryDTO.imageQuestions[this.currentImageQuestionIndex];
  }

  public previousStep(): void {
    if (this.currentImageQuestionIndex == 0) {
      this.checkStateService.previousStep(this.activatedRoute);
    } else {
      this.previousQuestion();
    }
  }

  public nextStep(): void {
    if (this.currentImageQuestionIndex + 1 >= this.questionCategoryDTO.imageQuestions.length) {
      this.saveImageQuestionAnswers();
    } else {
      this.nextQuestion();
    }
  }

  private previousQuestion(): void {
    this.currentImageQuestionIndex -= 1;
  }

  private nextQuestion(): void {
    this.currentImageQuestionIndex += 1;
  }

  private saveImageQuestionAnswers(): void {
    if (this.submission) {
      const imageQuestionAnswers = [];
      imageQuestionAnswers.push(...this.imageQuestionAnswers);

      this.submissionService
        .addImageQuestionAnswersToSubmission(<number>this.submission?.id, imageQuestionAnswers)
        .subscribe((updatedSubmission) => {
          this.checkStateService.setSubmission(updatedSubmission);
          this.checkStateService.nextStep(this.activatedRoute);
        });
    }
  }
}

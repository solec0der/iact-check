import { Injectable } from '@angular/core';
import { CheckDTO } from '../admin/shared/dtos/check-dto';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { CustomerDTO } from '../admin/shared/dtos/customer-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionCategoryDTO } from '../admin/shared/dtos/question-category-dto';
import { SubmissionDTO } from '../shared/dtos/submission-dto';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CheckStateService {
  private activeCheck = new ReplaySubject<CheckDTO>(1);
  private activeCustomer = new ReplaySubject<CustomerDTO>(1);
  private activeQuestionCategory = new ReplaySubject<QuestionCategoryDTO>(1);
  private currentProgressPercentage = new ReplaySubject<number>();

  private _submission: SubmissionDTO | undefined;

  private currentStep = 1;
  private readonly numberOfSteps = 5;

  constructor(
    private readonly router: Router,
    private readonly translateService: TranslateService
  ) {
    this.calculateProgressBarPercentage();
  }

  public setActiveCheck(checkDTO: CheckDTO): void {
    this.activeCheck.next(checkDTO);
    this.translateService.use(checkDTO.language.locale);
  }

  public setActiveCustomer(customerDTO: CustomerDTO): void {
    this.activeCustomer.next(customerDTO);
  }

  public setActiveQuestionCategory(
    questionCategoryDTO: QuestionCategoryDTO
  ): void {
    this.activeQuestionCategory.next(questionCategoryDTO);
  }

  public getActiveCheck(): Observable<CheckDTO> {
    return this.activeCheck.asObservable();
  }

  public getActiveCustomer(): Observable<CustomerDTO> {
    return this.activeCustomer.asObservable();
  }

  public getActiveQuestionCategory(): Observable<QuestionCategoryDTO> {
    return this.activeQuestionCategory.asObservable();
  }

  public getCurrentProgressPercentage(): Observable<number> {
    return this.currentProgressPercentage.asObservable();
  }

  public setStep(step: number, currentRoute: ActivatedRoute): void {
    this.currentStep = step;
    this.navigateToCurrentStep(currentRoute);
  }

  public previousStep(currentRoute: ActivatedRoute): void {
    this.currentStep--;
    this.navigateToCurrentStep(currentRoute);
  }

  public nextStep(currentRoute: ActivatedRoute): void {
    this.currentStep++;
    this.navigateToCurrentStep(currentRoute);
  }

  public getScoreByQuestionCategoryId(questionCategoryId: number): number {
    if (this.submission) {
      const scores = this.submission.rangeQuestionAnswers
        .filter(
          (rangeQuestionAnswer) =>
            rangeQuestionAnswer.questionCategoryId === questionCategoryId
        )
        .map((value) => value.value);

      if (scores.length > 0) {
        return scores.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
      }
    }
    return 0;
  }

  get submission(): SubmissionDTO | undefined {
    return this._submission;
  }

  set submission(value: SubmissionDTO | undefined) {
    this._submission = value;
  }

  private navigateToCurrentStep(currentRoute: ActivatedRoute): void {
    this.router
      .navigate(['../' + this.currentStep], { relativeTo: currentRoute })
      .then(() => {
        this.calculateProgressBarPercentage();
      });
  }

  private calculateProgressBarPercentage(): void {
    this.currentProgressPercentage.next(
      (100 / this.numberOfSteps) * this.currentStep
    );
  }
}

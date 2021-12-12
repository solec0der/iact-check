import { Injectable } from '@angular/core';
import { CheckDTO } from '../shared/dtos/check-dto';
import { Observable, ReplaySubject } from 'rxjs';
import { CustomerDTO } from '../shared/dtos/customer-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionCategoryDTO } from '../shared/dtos/question-category-dto';
import { SubmissionDTO } from '../shared/dtos/submission-dto';
import { CheckService } from '../shared/services/check.service';

@Injectable({
  providedIn: 'root',
})
export class CheckStateService {
  private activeCheck = new ReplaySubject<CheckDTO>(1);
  private activeCustomer = new ReplaySubject<CustomerDTO>(1);
  private activeQuestionCategory = new ReplaySubject<QuestionCategoryDTO>(1);
  private currentProgressPercentage = new ReplaySubject<number>();

  private submission = new ReplaySubject<SubmissionDTO>(1);

  private currentStep = 1;
  private readonly numberOfSteps = 5;

  constructor(private readonly router: Router, private readonly checkService: CheckService) {
    this.calculateProgressBarPercentage();
    this.loadCheckDataFromLocalStorageIfPresent();
    this.saveChangesToActiveCheckToLocalStorage();

    // TEST
    // this.checkService.getCheckById(1).subscribe((check) => {
    //   this.activeCheck.next(check);
    //   this.activeQuestionCategory.next(check.questionCategories[0]);
    // });
  }

  public resetCheck(): void {
    this.activeCheck
      .subscribe((check) => {
        if (check) {
          this.router.navigate(['customers', check.customerId, 'checks', check.id, 'steps', 1]).then();
        }
      })
      .unsubscribe();

    this.activeQuestionCategory.next(undefined);
    this.submission.next(undefined);

    localStorage.removeItem('check');
    localStorage.removeItem('questionCategory');
    localStorage.removeItem('submission');
  }

  public setActiveCheck(checkDTO: CheckDTO): void {
    this.activeCheck.next(checkDTO);
  }

  public setActiveCustomer(customerDTO: CustomerDTO): void {
    this.activeCustomer.next(customerDTO);
  }

  public setActiveQuestionCategory(questionCategoryDTO: QuestionCategoryDTO): void {
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

  // public getScoreByQuestionCategoryId(questionCategoryId: number): number {
  //   if (this.submission) {
  //     const scores = this.submission.rangeQuestionAnswers
  //       .filter((rangeQuestionAnswer) => rangeQuestionAnswer.questionCategoryId === questionCategoryId)
  //       .map((value) => value.value);
  //
  //     if (scores.length > 0) {
  //       return scores.reduce((previousValue, currentValue) => previousValue + currentValue);
  //     }
  //   }
  //   return 0;
  // }

  public getSubmission(): Observable<SubmissionDTO> {
    return this.submission;
  }

  public setSubmission(submission: SubmissionDTO): void {
    this.submission.next(submission);
  }

  private navigateToCurrentStep(currentRoute: ActivatedRoute): void {
    this.router.navigate(['../' + this.currentStep], { relativeTo: currentRoute }).then(() => {
      this.calculateProgressBarPercentage();
    });
  }

  private calculateProgressBarPercentage(): void {
    this.currentProgressPercentage.next((100 / this.numberOfSteps) * this.currentStep);
  }

  private loadCheckDataFromLocalStorageIfPresent(): void {
    const rawSubmission = localStorage.getItem('submission');
    if (rawSubmission) {
      const submission: SubmissionDTO = JSON.parse(rawSubmission);
      this.setSubmission(submission);
    }

    const rawCheck = localStorage.getItem('check');
    if (rawCheck) {
      const check: CheckDTO = JSON.parse(rawCheck);
      this.setActiveCheck(check);
    }

    const rawQuestionCategory = localStorage.getItem('questionCategory');
    if (rawQuestionCategory) {
      const questionCategory: QuestionCategoryDTO = JSON.parse(rawQuestionCategory);
      this.setActiveQuestionCategory(questionCategory);
    }
  }

  private saveChangesToActiveCheckToLocalStorage(): void {
    this.submission.subscribe((submission) => {
      if (submission) {
        localStorage.setItem('submission', JSON.stringify(submission));
      }
    });

    this.activeCheck.subscribe((check) => {
      if (check) {
        localStorage.setItem('check', JSON.stringify(check));
      }
    });

    this.activeQuestionCategory.subscribe((questionCategory) => {
      if (questionCategory) {
        localStorage.setItem('questionCategory', JSON.stringify(questionCategory));
      }
    });
  }
}

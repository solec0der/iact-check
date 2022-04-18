import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PossibleOutcomeService } from '../../../admin/shared/services/possible-outcome.service';
import { QuestionCategoryDTO } from '../../../shared/dtos/question-category-dto';
import { PossibleOutcomeDTO } from '../../../shared/dtos/possible-outcome-dto';
import { CustomerDTO } from '../../../shared/dtos/customer-dto';
import { Steps } from '../steps';
import { MatDialog } from '@angular/material/dialog';
import { PossibleOutcomeDetailComponent } from './possible-outcome-detail/possible-outcome-detail.component';
import { BookmarkedPossibleOutcomeDTO } from '../../../shared/dtos/bookmarked-possible-outcome-dto';
import { SubmissionService } from '../../../shared/services/submission.service';
import { SubmissionDTO } from '../../../shared/dtos/submission-dto';

@Component({
  selector: 'app-possible-outcomes',
  templateUrl: './possible-outcomes.component.html',
  styleUrls: ['./possible-outcomes.component.scss'],
})
export class PossibleOutcomesComponent implements OnInit {
  public possibleOutcomes!: PossibleOutcomeDTO[];
  public customerDTO!: CustomerDTO;
  public questionCategoryDTO!: QuestionCategoryDTO;
  public submission!: SubmissionDTO;

  private bookmarkedPossibleOutcomes!: BookmarkedPossibleOutcomeDTO[];

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService,
    private readonly submissionService: SubmissionService,
    private readonly possibleOutcomeService: PossibleOutcomeService
  ) {}

  ngOnInit(): void {
    this.checkStateService.setStep(Steps.PossibleOutcomes, this.activatedRoute);

    this.checkStateService.getSubmission().subscribe((submission) => {
      this.submission = submission;
      if (submission) {
        this.bookmarkedPossibleOutcomes = submission.bookmarkedPossibleOutcomes;
      }
      this.loadData();
    });
  }

  public goBackToQuestionCategories(): void {
    this.checkStateService.setStep(Steps.QuestionCategorySelection, this.activatedRoute);
  }

  public showPossibleOutcomeDetail(possibleOutcome: PossibleOutcomeDTO): void {
    this.matDialog.open(PossibleOutcomeDetailComponent, {
      data: {
        possibleOutcome: possibleOutcome,
        bookmarkedPossibleOutcomes: this.bookmarkedPossibleOutcomes,
      },
    });
  }

  public isPossibleOutcomeInBookmarkedPossibleOutcomes(possibleOutcomeId: number): boolean {
    return this.bookmarkedPossibleOutcomes.some((value) => value.possibleOutcomeId === possibleOutcomeId);
  }

  public submitForm(): void {
    this.submissionService
      .addBookmarkedPossibleOutcomesToSubmission(<number>this.submission.id, this.bookmarkedPossibleOutcomes)
      .subscribe((submissionDTO) => {
        this.checkStateService.setSubmission(submissionDTO);
        this.checkStateService.setStep(Steps.ConfirmationScreen, this.activatedRoute);
      });
  }

  public goToMarketplace(): void {
    this.router.navigate(['../../', 'marketplace'], { relativeTo: this.activatedRoute }).then(() => {});
  }

  private loadData(): void {
    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO;
    });

    this.checkStateService.getActiveQuestionCategory().subscribe((questionCategoryDTO) => {
      this.questionCategoryDTO = questionCategoryDTO;

      if (
        this.submission &&
        (this.submission.rangeQuestionAnswers.length > 0 || this.submission.imageQuestionAnswers.length > 0)
      ) {
        this.possibleOutcomeService
          .getPossibleOutcomesBySubmissionIdAndQuestionCategoryId(
            this.submission.id as number,
            this.questionCategoryDTO.id
          )
          .subscribe((possibleOutcomes) => {
            this.possibleOutcomes = possibleOutcomes;
            console.log(this.possibleOutcomes);
          });
      }
    });
  }
}

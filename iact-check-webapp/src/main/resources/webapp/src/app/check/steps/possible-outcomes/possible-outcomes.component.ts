import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PossibleOutcomeService } from '../../../admin/shared/services/possible-outcome.service';
import { QuestionCategoryDTO } from '../../../shared/dtos/question-category-dto';
import { PossibleOutcomeDTO } from '../../../shared/dtos/possible-outcome-dto';
import { CustomerDTO } from '../../../shared/dtos/customer-dto';
import { PossibleScoreDTO } from '../../../shared/dtos/possible-score-dto';
import { Steps } from '../steps';
import { ColourUtility } from '../../../shared/utils/colour.utility';
import { MatDialog } from '@angular/material/dialog';
import { PossibleOutcomeDetailComponent } from './possible-outcome-detail/possible-outcome-detail.component';
import { BookmarkedPossibleOutcomeDTO } from '../../../shared/dtos/bookmarked-possible-outcome-dto';
import { SubmissionService } from '../../../shared/services/submission.service';
import { SubmissionDTO } from '../../../shared/dtos/submission-dto';
import { FlashCardsComponent } from '../../marketplace/flash-cards/flash-cards.component';

@Component({
  selector: 'app-possible-outcomes',
  templateUrl: './possible-outcomes.component.html',
  styleUrls: ['./possible-outcomes.component.scss'],
})
export class PossibleOutcomesComponent implements OnInit {
  public possibleOutcomes!: PossibleOutcomeDTO[];
  public customerDTO!: CustomerDTO;
  public readonly colourAdjuster = ColourUtility.adjustColour;
  public questionCategoryDTO!: QuestionCategoryDTO;
  public submission!: SubmissionDTO;

  private score: number = 0;
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
      this.bookmarkedPossibleOutcomes = submission.bookmarkedPossibleOutcomes;
      this.loadData();
    });
  }

  public getBackgroundColorOfPossibleOutcome(possibleOutcome: PossibleOutcomeDTO): string {
    const accentColour = <string>this.customerDTO.customerBranding?.accentColour;
    if (this.isScoreInPossibleScores(possibleOutcome.possibleScores)) {
      return accentColour;
    } else {
      return ColourUtility.adjustColour(accentColour, '80');
    }
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
    this.router.navigate(['../../', 'marketplace'], { relativeTo: this.activatedRoute }).then(() => {
      this.matDialog.open(FlashCardsComponent);
    });
  }

  private isScoreInPossibleScores(possibleScores: PossibleScoreDTO[]): boolean {
    return possibleScores.find((possibleScore) => possibleScore.score === this.score) !== undefined;
  }

  private loadData(): void {
    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO!;
    });

    this.checkStateService.getActiveQuestionCategory().subscribe((questionCategoryDTO) => {
      this.questionCategoryDTO = questionCategoryDTO;

      if (
        this.submission &&
        (this.submission.rangeQuestionAnswers.length > 0 || this.submission.imageQuestionAnswers.length > 0)
      ) {
        if (questionCategoryDTO.showOnlyBestMatchingPossibleOutcome) {
          this.loadBestMatchingPossibleOutcome(this.submission);
        } else {
          this.loadMultiplePossibleOutcomes();
        }
      }
    });
  }

  private loadMultiplePossibleOutcomes(): void {
    // TODO: Here, we should also directly get the possible outcomes according to the submission.id and questionCategoryId
    // TODO: Or simply use the method: loadPossibleOutcome and handle the if/else in the backend, that way it will be easiest.
    this.submissionService.getScoresGroupedByQuestionCategoryId(<number>this.submission.id).subscribe((scores) => {
      this.score = <number>scores.find((score) => score.questionCategoryId === this.questionCategoryDTO.id)?.score;

      this.possibleOutcomeService
        .getPossibleOutcomesByScoreAndQuestionCategoryId(this.score, this.questionCategoryDTO.id)
        .subscribe((possibleOutcomes) => {
          this.possibleOutcomes = possibleOutcomes;
        });
    });
  }

  private loadBestMatchingPossibleOutcome(submission: SubmissionDTO): void {
    this.possibleOutcomeService
      .getPossibleOutcomeBySubmissionIdAndQuestionCategoryId(<number>submission.id, this.questionCategoryDTO.id)
      .subscribe((possibleOutcome) => {
        this.possibleOutcomes = [possibleOutcome];
      });
  }
}

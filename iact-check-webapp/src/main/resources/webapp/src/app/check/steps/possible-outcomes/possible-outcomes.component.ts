import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-possible-outcomes',
  templateUrl: './possible-outcomes.component.html',
  styleUrls: ['./possible-outcomes.component.scss'],
})
export class PossibleOutcomesComponent implements OnInit {
  public possibleOutcomes!: PossibleOutcomeDTO[];
  public customerDTO!: CustomerDTO;
  public readonly colourAdjuster = ColourUtility.adjustColour;

  private score: number = 0;
  private questionCategoryDTO!: QuestionCategoryDTO;
  private bookmarkedPossibleOutcomes!: BookmarkedPossibleOutcomeDTO[];
  private submission!: SubmissionDTO;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService,
    private readonly submissionService: SubmissionService,
    private readonly possibleOutcomeService: PossibleOutcomeService
  ) {}

  ngOnInit(): void {
    this.checkStateService.setStep(Steps.PossibleOutcomes, this.activatedRoute);

    const submission = this.checkStateService.submission!;
    if (submission) {
      this.submission = submission;
      this.bookmarkedPossibleOutcomes = submission.bookmarkedPossibleOutcomes;
    }

    this.loadData();
  }

  public getBackgroundColorOfPossibleOutcome(
    possibleOutcome: PossibleOutcomeDTO
  ): string {
    const accentColour = <string>(
      this.customerDTO.customerBranding?.accentColour
    );
    if (this.isScoreInPossibleScores(possibleOutcome.possibleScores)) {
      return accentColour;
    } else {
      return ColourUtility.adjustColour(accentColour, '80');
    }
  }

  public goBackToQuestionCategories(): void {
    this.checkStateService.setStep(
      Steps.QuestionCategorySelection,
      this.activatedRoute
    );
  }

  public showPossibleOutcomeDetail(possibleOutcome: PossibleOutcomeDTO): void {
    const dialogRef = this.matDialog.open(PossibleOutcomeDetailComponent, {
      data: {
        possibleOutcome: possibleOutcome,
        bookmarkedPossibleOutcomes: this.bookmarkedPossibleOutcomes,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log(this.bookmarkedPossibleOutcomes);
    });
  }

  public isPossibleOutcomeInBookmarkedPossibleOutcomes(
    possibleOutcomeId: number
  ): boolean {
    return this.bookmarkedPossibleOutcomes.some(
      (value) => value.possibleOutcomeId === possibleOutcomeId
    );
  }

  public submitForm(): void {
    this.submissionService
      .addBookmarkedPossibleOutcomesToSubmission(
        <number>this.submission.id,
        this.bookmarkedPossibleOutcomes
      )
      .subscribe((submissionDTO) => {
        this.checkStateService.submission = submissionDTO;
        this.checkStateService.setStep(
          Steps.ConfirmationScreen,
          this.activatedRoute
        );
      });
  }

  private isScoreInPossibleScores(possibleScores: PossibleScoreDTO[]): boolean {
    return (
      possibleScores.find(
        (possibleScore) => possibleScore.score === this.score
      ) !== undefined
    );
  }

  private loadData(): void {
    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO!;
    });

    this.checkStateService
      .getActiveQuestionCategory()
      .subscribe((questionCategoryDTO) => {
        this.questionCategoryDTO = questionCategoryDTO;

        if (
          this.checkStateService.submission &&
          this.checkStateService.submission.rangeQuestionAnswers.length > 0
        ) {
          this.score = this.checkStateService.getScoreByQuestionCategoryId(
            this.questionCategoryDTO.id
          );
          this.possibleOutcomeService
            .getPossibleOutcomesByScoreAndQuestionCategoryId(
              this.score,
              this.questionCategoryDTO.id
            )
            .subscribe((possibleOutcomes) => {
              this.possibleOutcomes = possibleOutcomes;
            });
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { ActivatedRoute } from '@angular/router';
import { PossibleOutcomeService } from '../../../admin/shared/services/possible-outcome.service';
import { QuestionCategoryDTO } from '../../../admin/shared/dtos/question-category-dto';
import { PossibleOutcomeDTO } from '../../../admin/shared/dtos/possible-outcome-dto';
import { CustomerDTO } from '../../../admin/shared/dtos/customer-dto';
import { PossibleScoreDTO } from '../../../admin/shared/dtos/possible-score-dto';
import { Steps } from '../steps';

@Component({
  selector: 'app-possible-outcomes',
  templateUrl: './possible-outcomes.component.html',
  styleUrls: ['./possible-outcomes.component.scss'],
})
export class PossibleOutcomesComponent implements OnInit {
  public possibleOutcomes!: PossibleOutcomeDTO[];
  public customerDTO!: CustomerDTO;

  private score: number = 0;
  private questionCategoryDTO!: QuestionCategoryDTO;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService,
    private readonly possibleOutcomeService: PossibleOutcomeService
  ) {}

  ngOnInit(): void {
    this.checkStateService.setStep(Steps.PossibleOutcomes, this.activatedRoute);
    // this.loadData();
    this.loadDataDev();
  }

  public adjustColor(color: string, amount: string): string {
    if (color) {
      return amount === '0' ? color : color + amount;
    }
    return '0';
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
      return this.adjustColor(accentColour, '80');
    }
  }

  public goBackToQuestionCategories(): void {
    this.checkStateService.setStep(
      Steps.QuestionCategorySelection,
      this.activatedRoute
    );
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

  private loadDataDev(): void {
    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO;
    });

    this.possibleOutcomes = [];
    this.score = 6;

    for (let i = 0; i < 10; i++) {
      this.possibleOutcomes.push({
        id: i + 1,
        questionCategoryId: 1,
        title: 'Mögliches Ergebnis ' + (i + 1),
        subtitle: 'Dies ist ein Untertitel',
        description: 'Dies ist eine Beschreibung',
        youtubeUrl: 'Dies ist eine YouTube URL',
        possibleScores: [
          {
            id: 1,
            score: 6,
          },
          {
            id: 2,
            score: 7,
          },
        ],
      });
    }
    for (let i = 0; i < 10; i++) {
      this.possibleOutcomes.push({
        id: i + 1,
        questionCategoryId: 1,
        title: 'Mögliches Ergebnis ' + (i + 1),
        subtitle: 'Dies ist ein Untertitel',
        description: 'Dies ist eine Beschreibung',
        youtubeUrl: 'Dies ist eine YouTube URL',
        possibleScores: [
          {
            id: 1,
            score: 2,
          },
          {
            id: 2,
            score: 3,
          },
        ],
      });
    }
  }
}

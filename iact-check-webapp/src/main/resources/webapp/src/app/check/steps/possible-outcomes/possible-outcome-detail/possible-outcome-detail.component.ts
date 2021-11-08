import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PossibleOutcomeDTO } from '../../../../shared/dtos/possible-outcome-dto';
import { CORE_URL } from '../../../../app.config';
import { BookmarkedPossibleOutcomeDTO } from '../../../../shared/dtos/bookmarked-possible-outcome-dto';

@Component({
  selector: 'app-possible-outcome-detail',
  templateUrl: './possible-outcome-detail.component.html',
  styleUrls: ['./possible-outcome-detail.component.scss'],
})
export class PossibleOutcomeDetailComponent implements OnInit {
  private readonly _possibleOutcome: PossibleOutcomeDTO;
  private readonly _bookmarkedPossibleOutcomes: BookmarkedPossibleOutcomeDTO[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: PossibleOutcomeDetailData,
    private readonly matDialogRef: MatDialogRef<PossibleOutcomeDetailComponent>
  ) {
    this._possibleOutcome = data.possibleOutcome;
    this._bookmarkedPossibleOutcomes = data.bookmarkedPossibleOutcomes;
  }

  ngOnInit(): void {}

  public toggleIsInBookmarkedPossibleOutcomes(): void {
    if (this.isInBookmarkedPossibleOutcomes()) {
      const index = this._bookmarkedPossibleOutcomes.findIndex(
        (value) => value.possibleOutcomeId === this._possibleOutcome.id
      );
      this._bookmarkedPossibleOutcomes.splice(index, 1);
    } else {
      this._bookmarkedPossibleOutcomes.push({
        possibleOutcomeId: this._possibleOutcome.id,
      });
    }
  }

  public isInBookmarkedPossibleOutcomes(): boolean {
    return this._bookmarkedPossibleOutcomes.some(
      (value) => value.possibleOutcomeId === this._possibleOutcome.id
    );
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  get possibleOutcome(): PossibleOutcomeDTO {
    return this._possibleOutcome;
  }

  get thumbnailUrl(): string {
    return (
      CORE_URL +
      '/api/possible-outcomes/' +
      this._possibleOutcome.id +
      '/thumbnail'
    );
  }
}

export interface PossibleOutcomeDetailData {
  possibleOutcome: PossibleOutcomeDTO;
  bookmarkedPossibleOutcomes: BookmarkedPossibleOutcomeDTO[];
}

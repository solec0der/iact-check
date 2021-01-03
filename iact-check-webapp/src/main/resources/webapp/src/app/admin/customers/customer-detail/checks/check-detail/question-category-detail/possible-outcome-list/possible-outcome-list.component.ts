import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QuestionCategoryDTO } from '../../../../../../shared/dtos/question-category-dto';
import { ConfirmDialogComponent } from '../../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatTable } from '@angular/material/table';
import { PossibleOutcomeDTO } from '../../../../../../shared/dtos/possible-outcome-dto';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { PossibleOutcomeService } from '../../../../../../shared/services/possible-outcome.service';

@Component({
  selector: 'app-possible-outcome-list',
  templateUrl: './possible-outcome-list.component.html',
  styleUrls: ['./possible-outcome-list.component.scss'],
})
export class PossibleOutcomeListComponent implements OnInit {
  @Input('questionCategory')
  public questionCategoryDTO!: QuestionCategoryDTO;
  public displayedColumnsPossibleOutcomes = [
    'id',
    'title',
    'possibleScores',
    'actions',
  ];

  @ViewChild('possibleOutcomesTable')
  private possibleOutcomesTable!: MatTable<PossibleOutcomeDTO>;

  constructor(
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private translateService: TranslateService,
    private possibleOutcomeService: PossibleOutcomeService
  ) {}

  ngOnInit(): void {}

  public showPossibleOutcomeDeletionDialog(possibleOutcomeId: number): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant(
          'POSSIBLE_OUTCOMES.DELETION_DIALOG.TITLE'
        ),
        message: '',
        buttonTextCancel: this.translateService.instant(
          'POSSIBLE_OUTCOMES.DELETION_DIALOG.BUTTON_TEXT_CANCEL'
        ),
        buttonTextConfirm: this.translateService.instant(
          'POSSIBLE_OUTCOMES.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'
        ),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deletePossibleOutcomeById(possibleOutcomeId);
      }
    });
  }

  private deletePossibleOutcomeById(possibleOutcomeId: number): void {
    this.possibleOutcomeService
      .deletePossibleOutcomeById(possibleOutcomeId)
      .subscribe(() => {
        this.matSnackBar.open(
          this.translateService.instant('POSSIBLE_OUTCOMES.DELETED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
        this.questionCategoryDTO.possibleOutcomes.splice(
          this.questionCategoryDTO.possibleOutcomes.findIndex(
            (r) => r.id === possibleOutcomeId
          ),
          1
        );
        this.possibleOutcomesTable.renderRows();
      });
  }
}

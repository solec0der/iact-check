import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QuestionCategoryDTO } from '../../../../../../../shared/dtos/question-category-dto';
import { RangeQuestionService } from '../../../../../../shared/services/range-question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import {RangeQuestionDTO} from "../../../../../../../shared/dtos/range-question-dto";

@Component({
  selector: 'app-range-question-list',
  templateUrl: './range-question-list.component.html',
  styleUrls: ['./range-question-list.component.scss'],
})
export class RangeQuestionListComponent implements OnInit {
  @Input('questionCategory') public questionCategoryDTO!: QuestionCategoryDTO;

  public displayedColumnsRangeQuestions = ['id', 'questionText', 'actions'];

  @ViewChild('rangeQuestionsTable')
  private rangeQuestionsTable!: MatTable<RangeQuestionDTO>;

  constructor(
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private translateService: TranslateService,
    private rangeQuestionService: RangeQuestionService
  ) {}

  ngOnInit(): void {}

  public showRangeQuestionDeletionDialog(rangeQuestionId: number): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('QUESTIONS.DELETION_DIALOG.TITLE'),
        message: '',
        buttonTextCancel: this.translateService.instant(
          'QUESTIONS.DELETION_DIALOG.BUTTON_TEXT_CANCEL'
        ),
        buttonTextConfirm: this.translateService.instant(
          'QUESTIONS.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'
        ),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deleteRangeQuestionById(rangeQuestionId);
      }
    });
  }

  private deleteRangeQuestionById(rangeQuestionId: number): void {
    this.rangeQuestionService
      .deleteRangeQuestionById(rangeQuestionId)
      .subscribe(() => {
        this.matSnackBar.open(
          this.translateService.instant('QUESTIONS.DELETED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
        this.questionCategoryDTO.rangeQuestions.splice(
          this.questionCategoryDTO.rangeQuestions.findIndex(
            (r) => r.id === rangeQuestionId
          ),
          1
        );
        this.rangeQuestionsTable.renderRows();
      });
  }
}

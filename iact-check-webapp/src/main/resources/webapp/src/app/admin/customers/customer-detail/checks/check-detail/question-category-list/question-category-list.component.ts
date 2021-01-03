import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CheckDTO } from '../../../../../shared/dtos/check-dto';
import { ConfirmDialogComponent } from '../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionCategoryService } from '../../../../../shared/services/question-category.service';
import { MatTable } from '@angular/material/table';
import { QuestionCategoryDTO } from '../../../../../shared/dtos/question-category-dto';

@Component({
  selector: 'app-question-category-list',
  templateUrl: './question-category-list.component.html',
  styleUrls: ['./question-category-list.component.scss'],
})
export class QuestionCategoryListComponent implements OnInit {
  @Input('check') public checkDTO!: CheckDTO;

  public displayedColumnsQuestionCategories = ['id', 'title', 'actions'];

  @ViewChild('questionCategoriesTable')
  private questionCategoriesTable!: MatTable<QuestionCategoryDTO>;

  constructor(
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private translateService: TranslateService,
    private questionCategoryService: QuestionCategoryService
  ) {}

  ngOnInit(): void {}

  public showQuestionCategoryDeletionDialog(questionCategoryId: number): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant(
          'QUESTION_CATEGORIES.DELETION_DIALOG.TITLE'
        ),
        message: this.translateService.instant(
          'QUESTION_CATEGORIES.DELETION_DIALOG.MESSAGE'
        ),
        buttonTextCancel: this.translateService.instant(
          'QUESTION_CATEGORIES.DELETION_DIALOG.BUTTON_TEXT_CANCEL'
        ),
        buttonTextConfirm: this.translateService.instant(
          'QUESTION_CATEGORIES.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'
        ),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deleteQuestionCategoryById(questionCategoryId);
      }
    });
  }

  private deleteQuestionCategoryById(questionCategoryId: number): void {
    this.questionCategoryService
      .deleteQuestionCategoryById(questionCategoryId)
      .subscribe(() => {
        this.matSnackBar.open(
          this.translateService.instant('QUESTION_CATEGORIES.DELETED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
        this.checkDTO.questionCategories.splice(
          this.checkDTO.questionCategories.findIndex(
            (q) => (q.id === questionCategoryId)
          ),
          1
        );

        this.questionCategoriesTable.renderRows();
      });
  }
}

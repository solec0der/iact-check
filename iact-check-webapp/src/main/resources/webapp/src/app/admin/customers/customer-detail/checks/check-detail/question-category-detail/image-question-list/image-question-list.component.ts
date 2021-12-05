import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QuestionCategoryDTO } from '../../../../../../../shared/dtos/question-category-dto';
import { MatDialog } from '@angular/material/dialog';
import { ImageQuestionService } from '../../../../../../shared/services/image-question.service';
import { ConfirmDialogComponent } from '../../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from '../../../../../../../shared/services/snack-bar.service';
import { MatTab } from '@angular/material/tabs';
import { MatTable } from '@angular/material/table';
import { ImageQuestionDTO } from '../../../../../../../shared/dtos/image-question-dto';

@Component({
  selector: 'app-image-question-list',
  templateUrl: './image-question-list.component.html',
  styleUrls: ['./image-question-list.component.scss'],
})
export class ImageQuestionListComponent implements OnInit {
  @Input('questionCategory') public questionCategory!: QuestionCategoryDTO;

  @ViewChild('imageQuestionsTable', { static: true })
  private imageQuestionsTable!: MatTable<ImageQuestionDTO>;

  public readonly displayedColumns = ['id', 'questionText', 'actions'];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly snackBarService: SnackBarService,
    private readonly translateService: TranslateService,
    private readonly imageQuestionService: ImageQuestionService
  ) {}

  ngOnInit(): void {}

  public showImageQuestionDeletionDialog(imageQuestionId: number): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('QUESTIONS.DELETION_DIALOG.TITLE'),
        message: '',
        buttonTextCancel: this.translateService.instant('QUESTIONS.DELETION_DIALOG.BUTTON_TEXT_CANCEL'),
        buttonTextConfirm: this.translateService.instant('QUESTIONS.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deleteImageQuestionById(imageQuestionId);
      }
    });
  }

  private deleteImageQuestionById(imageQuestionId: number): void {
    this.imageQuestionService.deleteImageQuestionById(imageQuestionId).subscribe(() => {
      this.snackBarService.open(this.translateService.instant('QUESTIONS.DELETED_MESSAGE'));

      this.questionCategory.imageQuestions.splice(
        this.questionCategory.imageQuestions.findIndex((imageQuestion) => imageQuestion.id === imageQuestionId),
        1
      );
      this.imageQuestionsTable.renderRows();
    });
  }
}

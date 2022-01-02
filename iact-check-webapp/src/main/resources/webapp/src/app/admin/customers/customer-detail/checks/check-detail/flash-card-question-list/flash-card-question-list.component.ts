import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FlashCardService } from '../../../../../../shared/services/flash-card.service';
import { ActivatedRoute } from '@angular/router';
import { FlashCardQuestionDTO } from '../../../../../../shared/dtos/flash-card-question-dto';
import { ConfirmDialogComponent } from '../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-flash-card-question-list',
  templateUrl: './flash-card-question-list.component.html',
  styleUrls: ['./flash-card-question-list.component.scss'],
})
export class FlashCardQuestionListComponent implements OnInit {
  private checkId!: number;
  private _flashCardQuestions!: FlashCardQuestionDTO[];

  public displayedColumnsQuestionCategories = ['id', 'question', 'requiredQuestion', 'allowMultipleAnswers', 'actions'];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly translateService: TranslateService,
    private readonly flashCardService: FlashCardService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.checkId = Number(params.get('checkId'));
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  public showFlashCardQuestionDeletionDialog(flashCardQuestionId: number): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('FLASH_CARDS.DELETION_DIALOG.TITLE'),
        message: this.translateService.instant('FLASH_CARDS.DELETION_DIALOG.MESSAGE'),
        buttonTextCancel: this.translateService.instant('FLASH_CARDS.DELETION_DIALOG.BUTTON_TEXT_CANCEL'),
        buttonTextConfirm: this.translateService.instant('FLASH_CARDS.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deleteFlashCardQuestionById(flashCardQuestionId);
      }
    });
  }

  private deleteFlashCardQuestionById(flashCardQuestionId: number): void {
    this.flashCardService.deleteFlashCardQuestionById(flashCardQuestionId).subscribe(() => {
      this.matSnackBar.open(
        this.translateService.instant('FLASH_CARDS.DELETED_MESSAGE'),
        this.translateService.instant('SHARED.CLOSE'),
        {
          duration: 5000,
        }
      );
      this.loadData();
    });
  }

  private loadData(): void {
    this.flashCardService.getFlashCardQuestionsByCheckId(this.checkId).subscribe((flashCardQuestions) => {
      this._flashCardQuestions = flashCardQuestions;
    });
  }

  get flashCardQuestions(): FlashCardQuestionDTO[] {
    return this._flashCardQuestions;
  }
}

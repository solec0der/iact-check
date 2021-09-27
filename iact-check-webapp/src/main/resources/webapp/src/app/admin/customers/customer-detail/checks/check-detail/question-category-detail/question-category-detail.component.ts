import { Component, OnInit } from '@angular/core';
import { QuestionCategoryDTO } from '../../../../../shared/dtos/question-category-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../../../shared/services/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { QuestionCategoryService } from '../../../../../shared/services/question-category.service';
import { CORE_URL } from '../../../../../../app.config';
import { FileReaderUtil } from '../../../../../shared/util/file-reader.util';
import { ConfirmDialogComponent } from '../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { getLanguageByLocale, LanguageDTO } from '../../../../../../shared/dtos/language-dto';
import { AVAILABLE_LANGUAGES } from '../../../../../../shared/model/available-languages';

@Component({
  selector: 'app-question-category-detail',
  templateUrl: './question-category-detail.component.html',
  styleUrls: ['./question-category-detail.component.scss'],
})
export class QuestionCategoryDetailComponent implements OnInit {
  public action = '';
  public checkId = -1;
  public customerId = -1;
  public questionCategoryId = -1;

  public questionCategoryDTO!: QuestionCategoryDTO;
  public questionCategoryFromGroup!: FormGroup;
  public thumbnail!: File;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private questionCategoryService: QuestionCategoryService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.checkId = Number(params.get('checkId'));
      this.customerId = Number(params.get('customerId'));
      this.questionCategoryId = Number(params.get('questionCategoryId'));
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);
    if (this.action === 'edit') {
      this.loadData();
    } else if (this.action === 'create') {
      this.createQuestionCategoryFormGroup();
    }
  }

  public save(): void {
    if (this.action === 'create') {
      this.createQuestionCategory();
    } else if (this.action === 'edit') {
      this.updateQuestionCategory();
    }
  }

  public goBackToCheck(): void {
    this.router
      .navigate(['../../../edit'], {
        relativeTo: this.activatedRoute,
      })
      .then();
  }

  public showQuestionCategoryDeletionDialog(): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('QUESTION_CATEGORIES.DELETION_DIALOG.TITLE'),
        message: this.translateService.instant('QUESTION_CATEGORIES.DELETION_DIALOG.MESSAGE'),
        buttonTextCancel: this.translateService.instant('QUESTION_CATEGORIES.DELETION_DIALOG.BUTTON_TEXT_CANCEL'),
        buttonTextConfirm: this.translateService.instant('QUESTION_CATEGORIES.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deleteQuestionCategory();
      }
    });
  }

  public showThumbnail(): void {
    window.open(CORE_URL + '/api/question-categories/' + this.questionCategoryId + '/thumbnail', '_blank');
  }

  public get availableLanguages(): LanguageDTO[] {
    return AVAILABLE_LANGUAGES;
  }

  private loadData() {
    this.questionCategoryService.getQuestionCategoryById(this.questionCategoryId).subscribe((questionCategoryDTO) => {
      this.questionCategoryDTO = questionCategoryDTO;
      this.loadThumbnail();
    });
  }

  private loadThumbnail(): void {
    this.questionCategoryService.getThumbnailByQuestionCategoryId(this.questionCategoryId).subscribe((thumbnail) => {
      this.thumbnail = FileReaderUtil.convertBlobToFile(thumbnail, this.questionCategoryDTO.title + '.png');
      this.createQuestionCategoryFormGroup();
    });
  }

  private createQuestionCategory(): void {
    const questionCategoryDTO: QuestionCategoryDTO = {
      id: -1,
      checkId: this.checkId,
      language: getLanguageByLocale(this.questionCategoryFromGroup.value.language)!,
      title: this.questionCategoryFromGroup.value.title,
      rangeQuestions: [],
      possibleOutcomes: [],
    };

    this.questionCategoryService.createQuestionCategory(questionCategoryDTO).subscribe((createdQuestionCategoryDTO) => {
      this.questionCategoryDTO = createdQuestionCategoryDTO;

      this.router
        .navigate(['../../' + createdQuestionCategoryDTO.id + '/edit'], {
          relativeTo: this.activatedRoute,
        })
        .then(() => {
          this.matSnackBar.open(
            this.translateService.instant('QUESTION_CATEGORIES.CREATED_MESSAGE'),
            this.translateService.instant('SHARED.CLOSE'),
            {
              duration: 5000,
            }
          );
          this.uploadThumbnail();
        });
    });
  }

  private updateQuestionCategory(): void {
    const questionCategoryDTO: QuestionCategoryDTO = {
      id: this.questionCategoryId,
      checkId: this.checkId,
      title: this.questionCategoryFromGroup.value.title,
      language: getLanguageByLocale(this.questionCategoryFromGroup.value.language)!,
      rangeQuestions: [],
      possibleOutcomes: [],
    };

    this.questionCategoryService
      .updateQuestionCategoryById(this.questionCategoryId, questionCategoryDTO)
      .subscribe((updatedQuestionCategoryDTO) => {
        this.questionCategoryDTO = updatedQuestionCategoryDTO;
        this.matSnackBar.open(
          this.translateService.instant('QUESTION_CATEGORIES.UPDATED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
        this.uploadThumbnail();
      });
  }

  private uploadThumbnail(): void {
    this.questionCategoryService
      .uploadThumbnailByQuestionCategoryId(this.questionCategoryId, this.questionCategoryFromGroup.value.thumbnail)
      .subscribe(() => {
        this.loadThumbnail();
      });
  }

  private deleteQuestionCategory() {
    this.questionCategoryService.deleteQuestionCategoryById(this.questionCategoryId).subscribe(() => {
      this.matSnackBar.open(
        this.translateService.instant('QUESTION_CATEGORIES.DELETED_MESSAGE'),
        this.translateService.instant('SHARED.CLOSE'),
        {
          duration: 5000,
        }
      );
      this.router
        .navigate(['../../../edit'], {
          relativeTo: this.activatedRoute,
        })
        .then();
    });
  }

  private createQuestionCategoryFormGroup(): void {
    this.questionCategoryFromGroup = new FormGroup({
      title: new FormControl(this.action === 'edit' ? this.questionCategoryDTO.title : '', Validators.required),
      language: new FormControl(
        this.action === 'edit' ? this.questionCategoryDTO.language.locale : '',
        Validators.required
      ),
      thumbnail: new FormControl(this.thumbnail, Validators.required),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../../../../../shared/services/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { RangeQuestionService } from '../../../../../../shared/services/range-question.service';
import { RangeStepDTO } from '../../../../../../../shared/dtos/range-step-dto';
import { FileReaderUtil } from '../../../../../../shared/util/file-reader.util';
import { CORE_URL } from '../../../../../../../app.config';
import { ConfirmDialogComponent } from '../../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { RangeQuestionDTO } from '../../../../../../../shared/dtos/range-question-dto';

@Component({
  selector: 'app-range-question-detail',
  templateUrl: './range-question-detail.component.html',
  styleUrls: ['./range-question-detail.component.scss'],
})
export class RangeQuestionDetailComponent implements OnInit {
  public action = '';
  public questionCategoryId = -1;
  public customerId = -1;
  public rangeQuestionId = -1;

  public rangeQuestionDTO!: RangeQuestionDTO;
  public rangeQuestionFormGroup!: FormGroup;
  public rangeStepsFormArray!: FormArray;
  public icon!: File;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private rangeQuestionService: RangeQuestionService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.rangeQuestionId = Number(params.get('rangeQuestionId'));
      this.customerId = Number(params.get('customerId'));
      this.questionCategoryId = Number(params.get('questionCategoryId'));
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);

    if (this.action === 'edit') {
      this.loadData();
    } else if (this.action === 'create') {
      this.createRangeQuestionFormGroup();
      this.createInitialRangeStepsFormArray();
    } else if (this.action === 'copy') {
      this.loadData();
    }
  }

  public save(): void {
    if (this.action === 'create' || this.action === 'copy') {
      this.createRangeQuestion();
    } else if (this.action === 'edit') {
      this.updateRangeQuestion();
    }
  }

  public goBackToQuestionCategory(): void {
    this.router
      .navigate(['../../../edit'], {
        relativeTo: this.activatedRoute,
      })
      .then();
  }

  public addRangeStepFormGroup(): void {
    this.rangeStepsFormArray.push(RangeQuestionDetailComponent.createEmptyRangeStepFormGroup());
  }

  public removeRangeStepByIndex(index: number): void {
    if (this.rangeQuestionDTO) {
      this.rangeQuestionDTO.rangeSteps.splice(index, 1);
    }
    this.rangeStepsFormArray.removeAt(index);
  }

  public showRangeQuestionDeletionDialog(): void {
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
        this.deleteRangeQuestion();
      }
    });
  }

  public showIcon(): void {
    window.open(CORE_URL + '/api/range-questions/' + this.rangeQuestionId + '/icon', '_blank');
  }

  private loadData(): void {
    this.rangeQuestionService.getRangeQuestionById(this.rangeQuestionId).subscribe((rangeQuestionDTO) => {
      this.rangeQuestionDTO = rangeQuestionDTO;
      this.loadIcon();
    });
  }

  private loadIcon(): void {
    this.rangeQuestionService.getIconByRangeQuestionId(this.rangeQuestionId).subscribe((icon) => {
      this.icon = FileReaderUtil.convertBlobToFile(icon, this.rangeQuestionDTO.questionText + '.png');
      this.createRangeQuestionFormGroup();
      this.createRangeStepsFormArray();
    });
  }

  private createRangeQuestion(): void {
    const rangeQuestionDTO: RangeQuestionDTO = {
      id: -1,
      questionCategoryId: this.questionCategoryId,
      questionText: this.rangeQuestionFormGroup.value.questionText,
      rangeSteps: this.getRangeStepsFromFormArray(),
    };

    this.rangeQuestionService.createRangeQuestion(rangeQuestionDTO).subscribe((createdRangeQuestionDTO) => {
      this.rangeQuestionDTO = createdRangeQuestionDTO;

      this.router
        .navigate(['../../' + createdRangeQuestionDTO.id + '/edit'], {
          relativeTo: this.activatedRoute,
        })
        .then(() => {
          this.matSnackBar.open(
            this.translateService.instant('QUESTIONS.CREATED_MESSAGE'),
            this.translateService.instant('SHARED.CLOSE'),
            {
              duration: 5000,
            }
          );
          this.uploadIcon();
        });
    });
  }

  private updateRangeQuestion(): void {
    const rangeQuestionDTO: RangeQuestionDTO = {
      id: this.rangeQuestionId,
      questionCategoryId: this.questionCategoryId,
      questionText: this.rangeQuestionFormGroup.value.questionText,
      rangeSteps: this.getRangeStepsFromFormArray(),
    };

    this.rangeQuestionService
      .updateRangeQuestionById(this.rangeQuestionId, rangeQuestionDTO)
      .subscribe((updatedRangeQuestionDTO) => {
        this.rangeQuestionDTO = updatedRangeQuestionDTO;
        this.matSnackBar.open(
          this.translateService.instant('QUESTIONS.UPDATED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
        this.uploadIcon();
      });
  }

  private uploadIcon(): void {
    this.rangeQuestionService
      .uploadIconByRangeQuestionId(this.rangeQuestionId, this.rangeQuestionFormGroup.value.icon)
      .subscribe(() => {
        this.loadIcon();
      });
  }

  private getRangeStepsFromFormArray(): RangeStepDTO[] {
    const rangeSteps: RangeStepDTO[] = [];

    this.rangeStepsFormArray.controls.forEach((formGroup) => {
      if (formGroup.valid) {
        rangeSteps.push({
          id: formGroup.value.id,
          rangeQuestionId: -1,
          score: formGroup.value.score,
          description: formGroup.value.description,
        });
      }
    });
    return rangeSteps;
  }

  private createRangeQuestionFormGroup(): void {
    this.rangeQuestionFormGroup = new FormGroup({
      questionText: new FormControl(
        this.action === 'edit' ? this.rangeQuestionDTO.questionText : '',
        Validators.required
      ),
      icon: new FormControl(this.icon, Validators.required),
    });
  }

  private createInitialRangeStepsFormArray(): void {
    this.rangeStepsFormArray = new FormArray([RangeQuestionDetailComponent.createEmptyRangeStepFormGroup()]);
  }

  private createRangeStepsFormArray(): void {
    const formGroups: FormGroup[] = [];

    this.rangeQuestionDTO.rangeSteps.forEach((rangeStep) => {
      formGroups.push(RangeQuestionDetailComponent.createRangeStepFormGroupFromRangeStep(rangeStep));
    });

    this.rangeStepsFormArray = new FormArray(formGroups);
  }

  private deleteRangeQuestion(): void {
    this.rangeQuestionService.deleteRangeQuestionById(this.rangeQuestionId).subscribe(() => {
      this.matSnackBar.open(
        this.translateService.instant('QUESTIONS.DELETED_MESSAGE'),
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

  private static createEmptyRangeStepFormGroup(): FormGroup {
    return new FormGroup({
      score: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  private static createRangeStepFormGroupFromRangeStep(rangeStep: RangeStepDTO): FormGroup {
    return new FormGroup({
      id: new FormControl(rangeStep.id, Validators.required),
      score: new FormControl(rangeStep.score, Validators.required),
      description: new FormControl(rangeStep.description),
    });
  }
}

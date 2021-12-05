import { Component, OnInit } from '@angular/core';
import { ImageQuestionDTO } from '../../../../../../../shared/dtos/image-question-dto';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../../../../../../shared/services/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { ImageAnswerDTO } from '../../../../../../../shared/dtos/image-answer-dto';
import { ImageQuestionService } from '../../../../../../shared/services/image-question.service';
import { CORE_URL } from '../../../../../../../app.config';
import { forkJoin, Observable } from 'rxjs';
import { SnackBarService } from '../../../../../../../shared/services/snack-bar.service';
import {ConfirmDialogComponent} from "../../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-image-question-detail',
  templateUrl: './image-question-detail.component.html',
  styleUrls: ['./image-question-detail.component.scss'],
})
export class ImageQuestionDetailComponent implements OnInit {
  public action = '';
  public questionCategoryId = -1;
  public customerId = -1;
  public imageQuestionId = -1;

  public imageUrls: string[] = [];
  public pendingImages: File[] = [];

  public imageQuestionDTO!: ImageQuestionDTO;
  public imageQuestionFormGroup!: FormGroup;
  public imageAnswersFormArray!: FormArray;

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly customerService: CustomerService,
    private readonly snackBarService: SnackBarService,
    private readonly translateService: TranslateService,
    private readonly imageQuestionService: ImageQuestionService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.imageQuestionId = Number(params.get('imageQuestionId'));
      this.customerId = Number(params.get('customerId'));
      this.questionCategoryId = Number(params.get('questionCategoryId'));
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);

    if (this.action === 'edit') {
      this.loadData();
    } else if (this.action === 'create') {
      this.createImageQuestionFormGroup();
      this.createInitialImageAnswersFormArray();
    }
  }

  public save(): void {
    if (this.action === 'create') {
      this.createImageQuestion();
    } else if (this.action === 'edit') {
      this.updateImageQuestion();
    }
  }

  public goBackToQuestionCategory(): void {
    this.router
      .navigate(['../../../edit'], {
        relativeTo: this.activatedRoute,
      })
      .then();
  }

  public addImageAnswerFormGroup(): void {
    this.imageAnswersFormArray.push(ImageQuestionDetailComponent.createEmptyImageAnswerFormGroup());
  }

  public removeImageAnswerByIndex(index: number): void {
    if (this.imageQuestionDTO) {
      this.imageQuestionDTO.imageAnswers.splice(index, 1);
    }
    this.imageAnswersFormArray.removeAt(index);
    this.imageUrls.splice(index, 1);
    this.pendingImages.splice(index, 1);
  }

  public handleFileChange(files: FileList | null, imageAnswerIndex: number) {
    if (files) {
      if (files.length !== 1) {
        return;
      }
      const image = files[0];

      this.pendingImages[imageAnswerIndex] = image;

      const fileReader = new FileReader();
      fileReader.onload = (e) => (this.imageUrls[imageAnswerIndex] = <string>fileReader.result);

      fileReader.readAsDataURL(image);
    }
  }

  public showImageQuestionDeletionDialog(): void {
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
        this.deleteImageQuestionById(this.imageQuestionId);
      }
    });
  }

  private deleteImageQuestionById(imageQuestionId: number): void {
    this.imageQuestionService.deleteImageQuestionById(imageQuestionId).subscribe(() => {
      this.snackBarService.open(this.translateService.instant('QUESTIONS.DELETED_MESSAGE'));
      this.goBackToQuestionCategory();
    });
  }

  private createImageQuestion(): void {
    const imageQuestionDTO: ImageQuestionDTO = {
      questionCategoryId: this.questionCategoryId,
      questionText: this.imageQuestionFormGroup.value.questionText,
      imageAnswers: this.getImageAnswersFromFormArray(),
    };

    this.imageQuestionService.createImageQuestion(imageQuestionDTO).subscribe((createdImageQuestionDTO) => {
      this.imageQuestionDTO = createdImageQuestionDTO;
      this.router
        .navigate(['../../' + createdImageQuestionDTO.id + '/edit'], {
          relativeTo: this.activatedRoute,
        })
        .then(() => {
          this.snackBarService.open(this.translateService.instant('QUESTIONS.CREATED_MESSAGE'));
          this.createImageQuestionFormGroup();
          this.createImageAnswersFormArray();
          this.uploadImages();
        });
    });
  }

  private updateImageQuestion(): void {
    const imageQuestionDTO: ImageQuestionDTO = {
      id: this.imageQuestionId,
      questionCategoryId: this.questionCategoryId,
      questionText: this.imageQuestionFormGroup.value.questionText,
      imageAnswers: this.getImageAnswersFromFormArray(),
    };

    this.imageQuestionService
      .updateImageQuestionById(this.imageQuestionId, imageQuestionDTO)
      .subscribe((updatedImageQuestionDTO) => {
        this.imageQuestionDTO = updatedImageQuestionDTO;
        this.snackBarService.open(this.translateService.instant('QUESTIONS.UPDATED_MESSAGE'));
        this.createImageQuestionFormGroup();
        this.createImageAnswersFormArray();
        this.uploadImages();
      });
  }

  private getImageAnswersFromFormArray(): ImageAnswerDTO[] {
    const imageAnswers: ImageAnswerDTO[] = [];

    this.imageAnswersFormArray.controls.forEach((formGroup) => {
      if (formGroup.valid) {
        imageAnswers.push({
          id: formGroup.value.id,
          imageQuestionId: -1,
          score: formGroup.value.score,
        });
      }
    });
    return imageAnswers;
  }

  private uploadImages(): void {
    const uploadRequests: Observable<void>[] = [];

    this.imageAnswersFormArray.controls.forEach((formGroup, index) => {
      if (formGroup.valid && this.pendingImages[index]) {
        uploadRequests.push(
          this.imageQuestionService.uploadImageForImageAnswer(formGroup.value.id, this.pendingImages[index])
        );
      }
    });

    forkJoin(uploadRequests).subscribe(() => {
      this.pendingImages = [];
      this.imageUrls = [];
      this.createImageAnswersFormArray();
    });
  }

  private loadData(): void {
    this.imageQuestionService.getImageQuestionById(this.imageQuestionId).subscribe((imageQuestionDTO) => {
      this.imageQuestionDTO = imageQuestionDTO;
      this.createImageQuestionFormGroup();
      this.createImageAnswersFormArray();
    });
  }

  private createImageQuestionFormGroup(): void {
    this.imageQuestionFormGroup = new FormGroup({
      questionText: new FormControl(
        this.action === 'edit' ? this.imageQuestionDTO.questionText : '',
        Validators.required
      ),
    });
  }

  private createInitialImageAnswersFormArray(): void {
    this.imageAnswersFormArray = new FormArray([ImageQuestionDetailComponent.createEmptyImageAnswerFormGroup()]);
  }

  private createImageAnswersFormArray(): void {
    const formGroups: FormGroup[] = [];

    this.imageQuestionDTO.imageAnswers.forEach((imageAnswer, index) => {
      formGroups.push(ImageQuestionDetailComponent.createImageAnswerFormGroupFromImageAnswer(imageAnswer));
      this.imageUrls[index] = ImageQuestionDetailComponent.getUrlOfImageByImageAnswerId(<number>imageAnswer.id);
    });

    this.imageAnswersFormArray = new FormArray(formGroups);
  }

  private static createEmptyImageAnswerFormGroup(): FormGroup {
    return new FormGroup({
      score: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  private static createImageAnswerFormGroupFromImageAnswer(imageAnswerDTO: ImageAnswerDTO): FormGroup {
    return new FormGroup({
      id: new FormControl(imageAnswerDTO.id, Validators.required),
      score: new FormControl(imageAnswerDTO.score, Validators.required),
      image: new FormControl(''),
    });
  }

  private static getUrlOfImageByImageAnswerId(imageAnswerId: number) {
    return (
      CORE_URL +
      '/api/image-questions/image-answers/' +
      imageAnswerId +
      '/image?timestamp=' +
      new Date().getMilliseconds()
    );
  }
}

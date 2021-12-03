import { Component, OnInit } from '@angular/core';
import { ImageQuestionDTO } from '../../../../../../../shared/dtos/image-question-dto';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../../../../../shared/services/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { ImageAnswerDTO } from '../../../../../../../shared/dtos/image-answer-dto';

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

  public imageQuestionDTO!: ImageQuestionDTO;
  public imageQuestionFormGroup!: FormGroup;
  public imageAnswersFormArray!: FormArray;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService
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
    } else if (this.action === 'copy') {
      this.loadData();
    }
  }

  public save(): void {
    if (this.action === 'create' || this.action === 'copy') {
      // this.createRangeQuestion();
    } else if (this.action === 'edit') {
      // this.updateRangeQuestion();
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

  public removeRangeStepByIndex(index: number): void {
    if (this.imageQuestionDTO) {
      this.imageQuestionDTO.imageAnswers.splice(index, 1);
    }
    this.imageAnswersFormArray.removeAt(index);
  }

  public createPreviewUrlOfImage(files: FileList | null, imageAnswerIndex: number) {
    if (files) {
      if (files.length !== 1) {
        return;
      }
      const image = files[0];

      const fileReader = new FileReader();
      fileReader.onload = (e) => (this.imageUrls[imageAnswerIndex] = <string>fileReader.result);

      fileReader.readAsDataURL(image);
    }
  }

  private loadData(): void {
    // this.rangeQuestionService.getRangeQuestionById(this.rangeQuestionId).subscribe((rangeQuestionDTO) => {
    //   this.rangeQuestionDTO = rangeQuestionDTO;
    //   this.createRangeQuestionFormGroup();
    //   this.createRangeStepsFormArray();
    // });
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

    this.imageQuestionDTO.imageAnswers.forEach((imageAnswer) => {
      formGroups.push(ImageQuestionDetailComponent.createImageAnswerFormGroupFromImageAnswer(imageAnswer));
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
    });
  }
}

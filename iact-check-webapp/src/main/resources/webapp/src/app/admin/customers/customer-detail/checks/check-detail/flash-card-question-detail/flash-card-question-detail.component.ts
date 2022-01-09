import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../../../../shared/services/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { FlashCardService } from '../../../../../../shared/services/flash-card.service';
import { FlashCardQuestionDTO } from '../../../../../../shared/dtos/flash-card-question-dto';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlashCardAnswerDTO } from '../../../../../../shared/dtos/flash-card-answer-dto';

@Component({
  selector: 'app-flash-card-question-detail',
  templateUrl: './flash-card-question-detail.component.html',
  styleUrls: ['./flash-card-question-detail.component.scss'],
})
export class FlashCardQuestionDetailComponent implements OnInit {
  public action = '';
  private customerId = -1;
  private checkId = 1;
  private flashCardQuestionId = 1;

  private _flashCardQuestion!: FlashCardQuestionDTO;
  private _flashCardQuestionFormGroup!: FormGroup;
  private _flashCardAnswersFormArray!: FormArray;

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly customerService: CustomerService,
    private readonly flashCardService: FlashCardService,
    private readonly translateService: TranslateService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.customerId = Number(params.get('customerId'));
      this.checkId = Number(params.get('checkId'));
      this.flashCardQuestionId = Number(params.get('flashCardQuestionId'));
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);
    if (this.action === 'edit') {
      this.loadData();
    } else if (this.action === 'create') {
      this.createFlashCardQuestionFormGroup();
      this.createEmptyFlashCardAnswerFormArray();
    }
  }

  public goBackToCheck(): void {
    this.router.navigate(['../../../', 'edit'], {relativeTo: this.activatedRoute}).then();
  }

  public save(): void {
    if (this.action === 'edit') {
      this.updateFlashCardQuestion();
    } else {
      this.createFlashCardQuestion();
    }
  }

  public addFlashCardAnswerFormGroup(): void {
    this._flashCardAnswersFormArray.push(this.createEmptyFlashCardAnswerFormGroup());
  }

  public removeFlashCardAnswerByIndex(index: number): void {
    if (this._flashCardQuestion) {
      this._flashCardQuestion.answers.splice(index, 1);
    }
    this.flashCardAnswersFormArray.removeAt(index);
  }

  private createFlashCardQuestion(): void {
    const flashCardQuestion = this.createDTOFromFormGroup();

    this.flashCardService
      .createFlashCardQuestion(flashCardQuestion)
      .subscribe((createdFlashCardQuestion) => {
        this._flashCardQuestion = createdFlashCardQuestion;
        this.router.navigate(['../../' + createdFlashCardQuestion.id, 'edit'], {relativeTo: this.activatedRoute}).then(() => {
          this.loadData();
        })
      });
  }

  private updateFlashCardQuestion(): void {
    const flashCardQuestion = this.createDTOFromFormGroup();

    this.flashCardService
      .updateFlashCardQuestionById(this.flashCardQuestionId, flashCardQuestion)
      .subscribe((updatedFlashCardQuestion) => {
        this._flashCardQuestion = updatedFlashCardQuestion;
        this.createFlashCardQuestionFormGroup();
        this.createFlashCardAnswerFormArray();
      });
  }

  private createDTOFromFormGroup(): FlashCardQuestionDTO {
    return {
      id: this.flashCardQuestionId,
      checkId: this.checkId,
      question: this.flashCardQuestionFormGroup.value.question,
      requiredQuestion: this.flashCardQuestionFormGroup.value.requiredQuestion,
      allowMultipleAnswers: this.flashCardQuestionFormGroup.value.allowMultipleAnswers,
      answers: this.flashCardAnswersFormArray.controls.map((formGroup) => {
        return {
          id: -1,
          answer: formGroup.value.answer,
          correctAnswer: formGroup.value.correctAnswer,
        };
      }),
    };
  }

  private loadData(): void {
    this.flashCardService.getFlashCardQuestionById(this.flashCardQuestionId).subscribe((flashCardQuestion) => {
      this._flashCardQuestion = flashCardQuestion;
      this.createFlashCardQuestionFormGroup();
      this.createFlashCardAnswerFormArray();
    });
  }

  private createFlashCardQuestionFormGroup(): void {
    this._flashCardQuestionFormGroup = new FormGroup({
      question: new FormControl(this.action === 'edit' ? this._flashCardQuestion.question : '', Validators.required),
      requiredQuestion: new FormControl(
        this.action === 'edit' ? this._flashCardQuestion.requiredQuestion : false,
        Validators.required
      ),
      allowMultipleAnswers: new FormControl(
        this.action === 'edit' ? this._flashCardQuestion.allowMultipleAnswers : false,
        Validators.required
      ),
    });
  }

  private createEmptyFlashCardAnswerFormArray(): void {
    const formGroups: FormGroup[] = [];
    formGroups.push(this.createEmptyFlashCardAnswerFormGroup());
    this._flashCardAnswersFormArray = new FormArray(formGroups);
  }

  private createFlashCardAnswerFormArray(): void {
    const formGroups: FormGroup[] = [];

    this._flashCardQuestion.answers.forEach((answer) => {
      formGroups.push(this.createFlashCardAnswerFormGroupFromDTO(answer));
    });

    this._flashCardAnswersFormArray = new FormArray(formGroups);
  }

  private createFlashCardAnswerFormGroupFromDTO(flashCardAnswer: FlashCardAnswerDTO): FormGroup {
    return new FormGroup({
      answer: new FormControl(flashCardAnswer.answer, Validators.required),
      correctAnswer: new FormControl(flashCardAnswer.correctAnswer, Validators.required),
    });
  }

  private createEmptyFlashCardAnswerFormGroup(): FormGroup {
    return new FormGroup({
      answer: new FormControl('', Validators.required),
      correctAnswer: new FormControl(false, Validators.required),
    });
  }

  get flashCardQuestion(): FlashCardQuestionDTO {
    return this._flashCardQuestion;
  }

  get flashCardQuestionFormGroup(): FormGroup {
    return this._flashCardQuestionFormGroup;
  }

  get flashCardAnswersFormArray(): FormArray {
    return this._flashCardAnswersFormArray;
  }
}

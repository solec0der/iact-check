import { Component, OnInit } from '@angular/core';
import { QuestionCategoryDTO } from '../../../../shared/dtos/question-category-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../../shared/services/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { QuestionCategoryService } from '../../../../shared/services/question-category.service';
import { CORE_URL } from '../../../../../app.config';
import { FileReaderUtil } from '../../../../shared/util/file-reader.util';

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
      .navigateByUrl(
        '/admin/customers/' +
          this.customerId +
          '/checks/' +
          this.checkId +
          '/edit'
      )
      .then();
  }

  public showQuestionCategoryDeletionDialog(): void {}

  public showThumbnail(): void {
    window.open(
      CORE_URL +
        '/api/question-categories/' +
        this.questionCategoryId +
        '/thumbnail',
      '_blank'
    );
  }

  private loadData() {
    this.questionCategoryService
      .getQuestionCategoryById(this.questionCategoryId)
      .subscribe((questionCategoryDTO) => {
        this.questionCategoryDTO = questionCategoryDTO;
        this.loadThumbnail();
      });
  }

  private loadThumbnail(): void {
    this.questionCategoryService
      .getThumbnailByQuestionCategoryId(this.questionCategoryId)
      .subscribe((thumbnail) => {
        this.thumbnail = FileReaderUtil.convertBlobToFile(
          thumbnail,
          this.questionCategoryDTO.title + '.png'
        );
        this.createQuestionCategoryFormGroup();
      });
  }

  private createQuestionCategory(): void {
    const questionCategoryDTO: QuestionCategoryDTO = {
      id: -1,
      checkId: this.checkId,
      title: this.questionCategoryFromGroup.value.title,
      questions: [],
      possibleOutcomes: [],
    };

    this.questionCategoryService
      .createQuestionCategory(questionCategoryDTO)
      .subscribe((createdQuestionCategoryDTO) => {
        this.questionCategoryDTO = createdQuestionCategoryDTO;

        this.router
          .navigate([
            'admin',
            'customers',
            this.customerId,
            'checks',
            createdQuestionCategoryDTO.checkId,
            'question-categories',
            createdQuestionCategoryDTO.id,
            'edit',
          ])
          .then(() => {
            this.uploadThumbnail();
          });
      });
  }

  private updateQuestionCategory(): void {
    const questionCategoryDTO: QuestionCategoryDTO = {
      id: this.questionCategoryId,
      checkId: this.checkId,
      title: this.questionCategoryFromGroup.value.title,
      questions: [],
      possibleOutcomes: [],
    };

    this.questionCategoryService
      .updateQuestionCategoryById(this.questionCategoryId, questionCategoryDTO)
      .subscribe((updatedQuestionCategoryDTO) => {
        this.questionCategoryDTO = updatedQuestionCategoryDTO;
        this.uploadThumbnail();
      });
  }

  private uploadThumbnail(): void {
    this.questionCategoryService
      .uploadThumbnailByQuestionCategoryId(
        this.questionCategoryId,
        this.questionCategoryFromGroup.value.thumbnail
      )
      .subscribe(() => {
        this.loadThumbnail();
      });
  }

  private createQuestionCategoryFormGroup(): void {
    this.questionCategoryFromGroup = new FormGroup({
      title: new FormControl(
        this.action === 'edit' ? this.questionCategoryDTO.title : '',
        Validators.required
      ),
      thumbnail: new FormControl(this.thumbnail, Validators.required),
    });
  }
}

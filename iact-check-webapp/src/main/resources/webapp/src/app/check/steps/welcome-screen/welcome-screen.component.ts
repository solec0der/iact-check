import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { CheckDTO } from '../../../admin/shared/dtos/check-dto';
import { CustomerDTO } from '../../../admin/shared/dtos/customer-dto';
import { CORE_URL } from '../../../app.config';
import { QuestionCategoryDTO } from '../../../admin/shared/dtos/question-category-dto';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent implements OnInit {
  public checkDTO!: CheckDTO;
  public customerDTO!: CustomerDTO;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });

    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO;
    });
  }

  public getWidthOfQuestionCategory(): string {
    return 100 / this.checkDTO?.questionCategories.length - 4 + '%';
  }

  public getQuestionCategoryThumbnailById(questionCategoryId: number): string {
    return (
      CORE_URL + '/api/question-categories/' + questionCategoryId + '/thumbnail'
    );
  }

  public selectQuestionCategory(questionCategory: QuestionCategoryDTO): void {
    this.checkStateService.setActiveQuestionCategory(questionCategory);
    this.checkStateService.nextStep(this.activatedRoute);
  }
}

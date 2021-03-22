import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { CheckDTO } from '../../../admin/shared/dtos/check-dto';
import { CustomerDTO } from '../../../admin/shared/dtos/customer-dto';
import { CORE_URL } from '../../../app.config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent implements OnInit {
  public customerDTO!: CustomerDTO;
  public checkDTO!: CheckDTO;

  private readonly CURRENT_STEP = 1;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.checkStateService.setStep(this.CURRENT_STEP, this.activatedRoute);
  }

  public getWidthOfQuestionCategory(): string {
    return 100 / this.checkDTO?.questionCategories.length - 4 + '%';
  }

  public getQuestionCategoryThumbnailById(questionCategoryId: number): string {
    return (
      CORE_URL + '/api/question-categories/' + questionCategoryId + '/thumbnail'
    );
  }

  public nextStep(): void {
    this.checkStateService.nextStep(this.activatedRoute);
  }
  //
  // public selectQuestionCategory(questionCategory: QuestionCategoryDTO): void {
  //   this.checkStateService.setActiveQuestionCategory(questionCategory);
  //   this.checkStateService.nextStep(this.activatedRoute);
  // }

  private loadData(): void {
    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO;
    });

    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });
  }
}

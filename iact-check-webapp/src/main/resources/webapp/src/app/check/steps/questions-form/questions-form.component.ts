import { Component, OnInit } from '@angular/core';
import { CheckDTO } from '../../../admin/shared/dtos/check-dto';
import { ActivatedRoute } from '@angular/router';
import { CheckStateService } from '../../check-state.service';
import { QuestionCategoryDTO } from '../../../admin/shared/dtos/question-category-dto';
import { CORE_URL } from '../../../app.config';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss'],
})
export class QuestionsFormComponent implements OnInit {
  private readonly CURRENT_STEP = 4;

  public checkDTO!: CheckDTO;
  public questionCategoryDTO!: QuestionCategoryDTO;

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

  public getIconUrlByRangeQuestionId(rangeQuestionId: number): string {
    return CORE_URL + '/api/range-questions/' + rangeQuestionId + '/icon';
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });

    this.checkStateService
      .getActiveQuestionCategory()
      .subscribe((questionCategoryDTO) => {
        this.questionCategoryDTO = questionCategoryDTO;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { CheckDTO } from '../../../shared/dtos/check-dto';
import { ActivatedRoute } from '@angular/router';
import { CheckStateService } from '../../check-state.service';
import { QuestionCategoryDTO } from '../../../shared/dtos/question-category-dto';
import { SubmissionService } from '../../../shared/services/submission.service';
import { Steps } from '../steps';
import { RandomUtility } from '../../../shared/utils/random.utility';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss'],
})
export class QuestionsFormComponent implements OnInit {
  public checkDTO!: CheckDTO;
  public questionCategoryDTO!: QuestionCategoryDTO;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly submissionService: SubmissionService,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.setStep(Steps.QuestionsForm, this.activatedRoute);
    this.loadData();
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });

    this.checkStateService.getActiveQuestionCategory().subscribe((questionCategoryDTO) => {
      this.questionCategoryDTO = questionCategoryDTO;

      this.questionCategoryDTO.imageQuestions.forEach((imageQuestion) => {
        imageQuestion.imageAnswers = RandomUtility.shuffle(imageQuestion.imageAnswers);
      });
    });
  }
}

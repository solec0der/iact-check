import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { CheckDTO } from '../../../shared/dtos/check-dto';
import { SubmissionDTO } from '../../../shared/dtos/submission-dto';
import { FlashCardService } from '../../../shared/services/flash-card.service';
import { FlashCardQuestionDTO } from '../../../shared/dtos/flash-card-question-dto';
import { FlashCardsStateService } from './flash-cards-state.service';
import { MatStepper } from '@angular/material/stepper';
import { FlashCardsUtil } from './flash-cards.util';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashCardsComponent implements OnInit {
  public check!: CheckDTO;
  public submission!: SubmissionDTO;
  public flashCardQuestions: FlashCardQuestionDTO[] | undefined = [];
  /**
   * Key: FlashCardQuestion.id
   * Value: FlashCardAnswer.id
   */
  public flashCardQuestionAnswers!: Map<number, number[]>;

  /**
   * Key: FlashCardQuestion.id
   * Value: Boolean Flag, which indicates, whether it was revealed, if the answer is correct or not
   */
  public answerRevealedMap!: Map<number, boolean>;

  @ViewChild('stepper') stepper!: MatStepper;

  private readonly _flashCardUtil: FlashCardsUtil;

  private readonly maxAmountOfRounds = 3; // TODO: Make configurable
  private readonly numberOfQuestionsPerRound = 5; // TODO: Make configurable
  private questionSkipTimeout!: any;

  constructor(
    private readonly checkStateService: CheckStateService,
    private readonly flashCardService: FlashCardService,
    private readonly flashCardsStateService: FlashCardsStateService
  ) {
    this._flashCardUtil = new FlashCardsUtil(flashCardsStateService);
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadNewQuestions(): void {
    this.flashCardQuestions = undefined;
    this.flashCardService.getFlashCardQuestionsByCheckId(<number>this.check.id).subscribe((flashCardQuestions) => {
      this.flashCardQuestions = this.flashCardsStateService.selectRandomFlashCardQuestions(
        flashCardQuestions,
        this.numberOfQuestionsPerRound
      );
      this.flashCardsStateService.setActiveFlashCardsQuestions(this.flashCardQuestions);
      setTimeout(() => {
        this.stepper.selectedIndex = 1;
      });
    });
  }

  public canNewQuestionsBeLoaded(): boolean {
    const numberOfRounds =
      this.flashCardsStateService.getPreviouslyUsedFlashCardQuestions().length / this.numberOfQuestionsPerRound;

    if (numberOfRounds === this.maxAmountOfRounds) {
      return false;
    }
    if (this.flashCardQuestions) {
      return this.flashCardQuestions.every((flashCardQuestion) => {
        const answers = this.flashCardQuestionAnswers.get(flashCardQuestion.id);
        const isRevealed = this.isRevealedIfAnswersAreCorrect(flashCardQuestion.id);
        return answers && answers.length > 0 && isRevealed;
      });
    }
    return false;
  }

  public isLastRoundFinished(): boolean {
    const numberOfRounds =
      this.flashCardsStateService.getPreviouslyUsedFlashCardQuestions().length / this.numberOfQuestionsPerRound;

    if (this.flashCardQuestions) {
      return (
        numberOfRounds === this.maxAmountOfRounds &&
        this.flashCardQuestions.every((flashCardQuestion) => {
          const answers = this.flashCardQuestionAnswers.get(flashCardQuestion.id);
          const isRevealed = this.isRevealedIfAnswersAreCorrect(flashCardQuestion.id);
          return answers && answers.length > 0 && isRevealed;
        })
      );
    }
    return false;
  }

  public verifyOrSkipQuestion(flashCardQuestion: FlashCardQuestionDTO, index: number): void {
    clearTimeout(this.questionSkipTimeout);
    const answers = this.flashCardQuestionAnswers.get(flashCardQuestion.id);

    if (answers && !this.isRevealedIfAnswersAreCorrect(flashCardQuestion.id)) {
      this.revealIfAnswersAreCorrect(flashCardQuestion);

      if (this.flashCardQuestions && index < this.flashCardQuestions?.length - 1) {
        this.questionSkipTimeout = setTimeout(() => {
          this.stepper.next();
        }, 1500);
      }
    } else {
      this.stepper.next();
    }
  }

  public getFlashCardQuestionAnswerState(flashCardQuestion: FlashCardQuestionDTO): string {
    if (!this.answerRevealedMap.get(flashCardQuestion.id)) {
      return 'edit';
    }

    const correctAnswers = FlashCardsUtil.getCorrectAnswers(flashCardQuestion.answers);
    const flashCardQuestionAnswers = this.getFlashCardQuestionAnswersByFlashCardQuestionId(flashCardQuestion.id);

    return correctAnswers.every((correctAnswer) => flashCardQuestionAnswers.includes(correctAnswer.id))
      ? 'done'
      : 'error';
  }

  public getSingleFlashCardQuestionAnswer(flashCardQuestionId: number): number {
    const flashCardQuestionAnswers = this.getFlashCardQuestionAnswersByFlashCardQuestionId(flashCardQuestionId);
    return flashCardQuestionAnswers.length === 1 ? flashCardQuestionAnswers[0] : -1;
  }

  public isAnswerInFlashCardQuestionAnswers(flashCardQuestionId: number, flashCardAnswerId: number): boolean {
    const flashCardQuestionAnswers = this.flashCardQuestionAnswers.get(flashCardQuestionId);
    return flashCardQuestionAnswers ? flashCardQuestionAnswers.includes(flashCardAnswerId) : false;
  }

  public submitAnswer(flashCardQuestionId: number, flashCardAnswerId: number, allowMultipleAnswers: boolean): void {
    let flashCardQuestionAnswers = this.flashCardQuestionAnswers.get(flashCardQuestionId);
    if (!flashCardQuestionAnswers || !allowMultipleAnswers) {
      flashCardQuestionAnswers = [];
    }

    if (flashCardQuestionAnswers.includes(flashCardAnswerId)) {
      const index = flashCardQuestionAnswers.indexOf(flashCardAnswerId);
      flashCardQuestionAnswers.splice(index, 1);
    } else {
      flashCardQuestionAnswers.push(flashCardAnswerId);
    }

    this.flashCardQuestionAnswers.set(flashCardQuestionId, flashCardQuestionAnswers);
    this.flashCardsStateService.setFlashCardQuestionAnswers(this.flashCardQuestionAnswers);
  }

  public revealIfAnswersAreCorrect(flashCardQuestion: FlashCardQuestionDTO): void {
    this.answerRevealedMap.set(flashCardQuestion.id, true);
    this.flashCardsStateService.setAnswerRevealedMap(this.answerRevealedMap);
  }

  public isRevealedIfAnswersAreCorrect(flashCardQuestionId: number): boolean {
    const answersRevealed = this.answerRevealedMap.get(flashCardQuestionId);
    return answersRevealed ? answersRevealed : false;
  }

  public isSubmitAnswerButtonDisabled(flashCardQuestion: FlashCardQuestionDTO): boolean {
    const answers = this.flashCardQuestionAnswers.get(flashCardQuestion.id);
    return !answers || this.isRevealedIfAnswersAreCorrect(flashCardQuestion.id);
  }

  private loadData(): void {
    this.checkStateService.getSubmission().subscribe((submission) => {
      this.submission = submission;
    });

    this.checkStateService.getActiveCheck().subscribe((check) => {
      this.check = check;
      this.loadFlashCardQuestions();
    });

    this.flashCardQuestionAnswers = this.flashCardsStateService.getFlashCardQuestionAnswers();
    this.answerRevealedMap = this.flashCardsStateService.getAnswerRevealedMap();
  }

  private loadFlashCardQuestions(): void {
    if (this.flashCardsStateService.getActiveFlashCardQuestions().length === 0) {
      this.flashCardService.getFlashCardQuestionsByCheckId(<number>this.check.id).subscribe((flashCardQuestions) => {
        this.flashCardQuestions = this.flashCardsStateService.selectRandomFlashCardQuestions(
          flashCardQuestions,
          this.numberOfQuestionsPerRound
        );
        this.flashCardsStateService.setActiveFlashCardsQuestions(this.flashCardQuestions);
      });
    } else {
      this.flashCardQuestions = this.flashCardsStateService.getActiveFlashCardQuestions();
    }
  }

  private getFlashCardQuestionAnswersByFlashCardQuestionId(flashCardQuestionId: number): number[] {
    const flashCardQuestionAnswers = this.flashCardQuestionAnswers.get(flashCardQuestionId);
    return flashCardQuestionAnswers ? flashCardQuestionAnswers : [];
  }

  get flashCardUtil(): FlashCardsUtil {
    return this._flashCardUtil;
  }
}

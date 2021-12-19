import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { CheckDTO } from '../../../shared/dtos/check-dto';
import { SubmissionDTO } from '../../../shared/dtos/submission-dto';
import { FlashCardService } from '../../../shared/services/flash-card.service';
import { FlashCardQuestionDTO } from '../../../shared/dtos/flash-card-question-dto';
import { FlashCardsStateService } from './flash-cards-state.service';
import { FlashCardAnswerDTO } from '../../../shared/dtos/flash-card-answer-dto';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashCardsComponent implements OnInit {
  public check!: CheckDTO;
  public submission!: SubmissionDTO;
  public flashCardQuestions: FlashCardQuestionDTO[] = [];
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

  constructor(
    private readonly checkStateService: CheckStateService,
    private readonly flashCardService: FlashCardService,
    private readonly flashCardsStateService: FlashCardsStateService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public isFlashCardQuestionAnswerState(flashCardQuestion: FlashCardQuestionDTO): boolean {
    if (!this.answerRevealedMap.get(flashCardQuestion.id)) {
      return false;
    }

    const correctAnswers = FlashCardsComponent.getCorrectAnswers(flashCardQuestion.answers);
    const flashCardQuestionAnswers = this.getFlashCardQuestionAnswersByFlashCardQuestionId(flashCardQuestion.id);

    return correctAnswers.every((correctAnswer) => flashCardQuestionAnswers.includes(correctAnswer.id));
  }

  public getSingleFlashCardQuestionAnswer(flashCardQuestionId: number): number {
    const flashCardQuestionAnswers = this.getFlashCardQuestionAnswersByFlashCardQuestionId(flashCardQuestionId);

    if (flashCardQuestionAnswers.length === 1) {
      return flashCardQuestionAnswers[0];
    }
    return -1;
  }

  public isAnswerInFlashCardQuestionAnswers(flashCardQuestionId: number, flashCardAnswerId: number): boolean {
    const flashCardQuestionAnswers = this.flashCardQuestionAnswers.get(flashCardQuestionId);

    if (flashCardQuestionAnswers) {
      return flashCardQuestionAnswers.includes(flashCardAnswerId);
    }
    return false;
  }

  public changeFlashCardQuestionAnswer(
    flashCardQuestionId: number,
    flashCardAnswerId: number,
    allowMultipleAnswers: boolean
  ): void {
    this.answerRevealedMap.set(flashCardQuestionId, false);
    let flashCardQuestionAnswers = this.flashCardQuestionAnswers.get(flashCardQuestionId);
    if (!flashCardQuestionAnswers) {
      flashCardQuestionAnswers = [];
    }

    if (!allowMultipleAnswers) {
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
    this.flashCardsStateService.setAnswerRevealedMap(this.answerRevealedMap);
  }

  public revealIfAnswersAreCorrect(flashCardQuestion: FlashCardQuestionDTO): void {
    this.answerRevealedMap.set(flashCardQuestion.id, true);
    this.flashCardsStateService.setAnswerRevealedMap(this.answerRevealedMap);
  }

  public isRevealedIfAnswersAreCorrect(flashCardQuestionId: number, flashCardAnswerId: number): boolean {
    const flashCardQuestionAnswers = this.flashCardQuestionAnswers.get(flashCardQuestionId);

    if (flashCardQuestionAnswers && !flashCardQuestionAnswers.includes(flashCardAnswerId)) {
      return false;
    }

    const answerRevealed = this.answerRevealedMap.get(flashCardQuestionId);
    return answerRevealed ? answerRevealed : false;
  }

  public isAnswerCorrect(flashCardQuestion: FlashCardQuestionDTO, flashCardAnswerId: number): boolean {
    const correctAnswers = FlashCardsComponent.getCorrectAnswers(flashCardQuestion.answers);
    return correctAnswers.some((correctAnswer) => correctAnswer.id === flashCardAnswerId);
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
        this.flashCardQuestions = this.flashCardsStateService.selectRandomFlashCardQuestions(flashCardQuestions, 5);
        this.flashCardsStateService.setActiveFlashCardsQuestions(this.flashCardQuestions);
      });
    } else {
      this.flashCardQuestions = this.flashCardsStateService.getActiveFlashCardQuestions();
    }
  }

  private getFlashCardQuestionAnswersByFlashCardQuestionId(flashCardQuestionId: number): number[] {
    const flashCardQuestionAnswers = this.flashCardQuestionAnswers.get(flashCardQuestionId);
    if (flashCardQuestionAnswers) {
      return flashCardQuestionAnswers;
    }
    return [];
  }

  private static getCorrectAnswers(flashCardAnswers: FlashCardAnswerDTO[]): FlashCardAnswerDTO[] {
    return flashCardAnswers.filter((flashCardAnswer) => flashCardAnswer.correctAnswer);
  }
}

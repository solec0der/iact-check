import { FlashCardsStateService } from './flash-cards-state.service';
import { FlashCardAnswerDTO } from '../../../shared/dtos/flash-card-answer-dto';
import { FlashCardQuestionDTO } from '../../../shared/dtos/flash-card-question-dto';

export class FlashCardsUtil {
  constructor(private readonly flashCardsStateService: FlashCardsStateService) {}

  public getNumberOfQuestions(): number {
    return this.flashCardsStateService.getPreviouslyUsedFlashCardQuestions().length;
  }

  public getNumberOfCorrectlyAnsweredQuestions(): number {
    const flashCardQuestions = this.flashCardsStateService.getPreviouslyUsedFlashCardQuestions();
    if (flashCardQuestions) {
      let numberOfCorrectlyAnsweredQuestions = 0;

      flashCardQuestions.forEach((flashCardQuestion) => {
        const flashCardQuestionAnswers = this.flashCardsStateService
          .getFlashCardQuestionAnswers()
          .get(flashCardQuestion.id);

        if (flashCardQuestionAnswers) {
          if (flashCardQuestion.allowMultipleAnswers) {
            if (
              flashCardQuestionAnswers &&
              flashCardQuestionAnswers.every((answer) => this.isAnswerCorrect(flashCardQuestion, answer))
            ) {
              numberOfCorrectlyAnsweredQuestions++;
            }
          } else {
            if (
              flashCardQuestionAnswers.length === 1 &&
              this.isAnswerCorrect(flashCardQuestion, flashCardQuestionAnswers[0])
            ) {
              numberOfCorrectlyAnsweredQuestions++;
            }
          }
        }
      });
      return numberOfCorrectlyAnsweredQuestions;
    }
    return 0;
  }

  public isAnswerCorrect(flashCardQuestion: FlashCardQuestionDTO, flashCardAnswerId: number): boolean {
    const correctAnswers = FlashCardsUtil.getCorrectAnswers(flashCardQuestion.answers);
    return correctAnswers.some((correctAnswer) => correctAnswer.id === flashCardAnswerId);
  }

  public static getCorrectAnswers(flashCardAnswers: FlashCardAnswerDTO[]): FlashCardAnswerDTO[] {
    return flashCardAnswers.filter((flashCardAnswer) => flashCardAnswer.correctAnswer);
  }
}

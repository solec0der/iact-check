import { Injectable } from '@angular/core';
import { FlashCardQuestionDTO } from '../../../shared/dtos/flash-card-question-dto';
import { RandomUtility } from '../../../shared/utils/random.utility';
import { MapUtility } from '../../../shared/utils/map.utility';

@Injectable({
  providedIn: 'root',
})
export class FlashCardsStateService {
  constructor() {}

  public addQuestionsToPreviouslyUsedFlashCardQuestions(flashCardQuestions: FlashCardQuestionDTO[]): void {
    const rawQuestions = localStorage.getItem('previouslyUsedFlashCardQuestions');

    let questions: FlashCardQuestionDTO[];

    if (rawQuestions) {
      questions = JSON.parse(rawQuestions);
    } else {
      questions = [];
    }

    questions.push(...flashCardQuestions);
    localStorage.setItem('previouslyUsedFlashCardQuestions', JSON.stringify(questions));
  }

  public getPreviouslyUsedFlashCardQuestions(): FlashCardQuestionDTO[] {
    const rawQuestions = localStorage.getItem('previouslyUsedFlashCardQuestions');

    if (rawQuestions) {
      return JSON.parse(rawQuestions);
    }
    return [];
  }

  public setFlashCardQuestionAnswers(flashCardQuestionAnswers: Map<number, number[]>): void {
    localStorage.setItem('flashCardQuestionAnswers', JSON.stringify(flashCardQuestionAnswers, MapUtility.replacer));
  }

  public getFlashCardQuestionAnswers(): Map<number, number[]> {
    const rawFlashCardQuestionAnswers = localStorage.getItem('flashCardQuestionAnswers');

    if (rawFlashCardQuestionAnswers) {
      return JSON.parse(rawFlashCardQuestionAnswers, MapUtility.reviver);
    }
    return new Map<number, number[]>();
  }

  public setAnswerRevealedMap(answerRevealedMap: Map<number, boolean>): void {
    localStorage.setItem('answerRevealedMap', JSON.stringify(answerRevealedMap, MapUtility.replacer));
  }

  public getAnswerRevealedMap(): Map<number, boolean> {
    const rawAnswerRevealedMap = localStorage.getItem('answerRevealedMap');

    if (rawAnswerRevealedMap) {
      return JSON.parse(rawAnswerRevealedMap, MapUtility.reviver);
    }
    return new Map<number, boolean>();
  }

  public setActiveFlashCardsQuestions(flashCardsQuestions: FlashCardQuestionDTO[]): void {
    localStorage.setItem('activeFlashCardQuestions', JSON.stringify(flashCardsQuestions));
  }

  public getActiveFlashCardQuestions(): FlashCardQuestionDTO[] {
    const rawFlashCardQuestions = localStorage.getItem('activeFlashCardQuestions');

    if (rawFlashCardQuestions) {
      return JSON.parse(rawFlashCardQuestions);
    }
    return [];
  }

  public selectRandomFlashCardQuestions(
    flashCardQuestions: FlashCardQuestionDTO[],
    amount: number
  ): FlashCardQuestionDTO[] {
    // Filter out the already used questions
    const previouslyUsedQuestions = this.getPreviouslyUsedFlashCardQuestions();
    const availableFlashCardQuestions = flashCardQuestions.filter((flashCardQuestion) =>
      previouslyUsedQuestions.every((previouslyUsedQuestion) => previouslyUsedQuestion.id !== flashCardQuestion.id)
    );
    const flashCardQuestionsWithoutRequiredQuestions = availableFlashCardQuestions.filter(
      (flashCardQuestion) => !flashCardQuestion.requiredQuestion
    );

    const selectedFlashCardQuestions = [];
    const requiredQuestion = this.getSingleRequiredQuestion(availableFlashCardQuestions);

    if (requiredQuestion) {
      selectedFlashCardQuestions.push(requiredQuestion);
      const index = availableFlashCardQuestions.findIndex((question) => question.id === requiredQuestion.id);
      availableFlashCardQuestions.splice(index, 1);
      amount--;
    }

    if (amount > flashCardQuestionsWithoutRequiredQuestions.length) {
      amount = flashCardQuestionsWithoutRequiredQuestions.length - 1;
    }

    for (let i = 0; i < amount; i++) {
      const randomIndex = RandomUtility.getRandomInt(0, flashCardQuestionsWithoutRequiredQuestions.length);
      selectedFlashCardQuestions.push(flashCardQuestionsWithoutRequiredQuestions[randomIndex]);
      flashCardQuestionsWithoutRequiredQuestions.splice(randomIndex, 1);
    }

    this.addQuestionsToPreviouslyUsedFlashCardQuestions(selectedFlashCardQuestions);
    return selectedFlashCardQuestions;
  }

  private getSingleRequiredQuestion(flashCardQuestions: FlashCardQuestionDTO[]): FlashCardQuestionDTO | undefined {
    const requiredQuestions = flashCardQuestions.filter((flashCardQuestion) => flashCardQuestion.requiredQuestion);
    const randomIndex = RandomUtility.getRandomInt(0, requiredQuestions.length);
    return requiredQuestions[randomIndex];
  }

  public resetFlashCards(): void {
    localStorage.removeItem('flashCardQuestionAnswers');
    localStorage.removeItem('answerRevealedMap');
    localStorage.removeItem('activeFlashCardQuestions');
  }
}

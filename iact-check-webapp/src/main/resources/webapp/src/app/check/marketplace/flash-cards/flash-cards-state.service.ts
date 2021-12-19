import { Injectable } from '@angular/core';
import { FlashCardQuestionDTO } from '../../../shared/dtos/flash-card-question-dto';
import { RandomUtility } from '../../../shared/utils/random.utility';
import {MapUtility} from "../../../shared/utils/map.utility";

@Injectable({
  providedIn: 'root',
})
export class FlashCardsStateService {
  constructor() {}

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
    const selectedFlashCardQuestions = [];

    if (amount > flashCardQuestions.length) {
      amount = flashCardQuestions.length - 1;
    }

    for (let i = 0; i < amount; i++) {
      const randomIndex = RandomUtility.getRandomInt(0, flashCardQuestions.length);
      selectedFlashCardQuestions.push(flashCardQuestions[randomIndex]);
      flashCardQuestions.splice(randomIndex, 1);
    }

    return selectedFlashCardQuestions;
  }
}

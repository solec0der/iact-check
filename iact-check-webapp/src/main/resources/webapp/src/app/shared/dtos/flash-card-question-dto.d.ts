import { FlashCardAnswerDTO } from './flash-card-answer-dto';

export interface FlashCardQuestionDTO {
  id: number;
  checkId: number;
  question: string;
  allowMultipleAnswers: boolean;
  requiredQuestion: boolean;
  answers: FlashCardAnswerDTO[];
}

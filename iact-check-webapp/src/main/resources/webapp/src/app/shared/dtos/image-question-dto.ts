import { ImageAnswerDTO } from './image-answer-dto';

export interface ImageQuestionDTO {
  id?: number;
  questionCategoryId: number;
  questionText: string;
  imageAnswers: ImageAnswerDTO[];
}

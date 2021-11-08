import { RangeStepDTO } from './range-step-dto';

export interface RangeQuestionDTO {
  id: number;
  questionCategoryId: number;
  questionText: string;
  rangeSteps: RangeStepDTO[];
}

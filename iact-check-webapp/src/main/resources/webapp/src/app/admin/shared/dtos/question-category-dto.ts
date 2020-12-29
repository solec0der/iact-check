import { RangeQuestionDTO } from './range-question-d-t-o';
import { PossibleOutcomeDTO } from './possible-outcome-dto';

export interface QuestionCategoryDTO {
  id: number;
  checkId: number;
  title: string;
  rangeQuestions: RangeQuestionDTO[];
  possibleOutcomes: PossibleOutcomeDTO[];
}

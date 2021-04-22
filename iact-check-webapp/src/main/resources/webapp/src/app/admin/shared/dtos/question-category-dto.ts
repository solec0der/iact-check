import { PossibleOutcomeDTO } from './possible-outcome-dto';
import {RangeQuestionDTO} from "./range-question-dto";

export interface QuestionCategoryDTO {
  id: number;
  checkId: number;
  title: string;
  rangeQuestions: RangeQuestionDTO[];
  possibleOutcomes: PossibleOutcomeDTO[];
}

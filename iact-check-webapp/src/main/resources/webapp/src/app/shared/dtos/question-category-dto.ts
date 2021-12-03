import { PossibleOutcomeDTO } from './possible-outcome-dto';
import { RangeQuestionDTO } from './range-question-dto';
import { LanguageDTO } from './language-dto';
import {ImageQuestionDTO} from "./image-question-dto";

export interface QuestionCategoryDTO {
  id: number;
  checkId: number;
  title: string;
  language: LanguageDTO;
  rangeQuestions: RangeQuestionDTO[];
  imageQuestions: ImageQuestionDTO[];
  possibleOutcomes: PossibleOutcomeDTO[];
}

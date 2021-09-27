import { PossibleOutcomeDTO } from './possible-outcome-dto';
import { RangeQuestionDTO } from './range-question-dto';
import { LanguageDTO } from '../../../shared/dtos/language-dto';

export interface QuestionCategoryDTO {
  id: number;
  checkId: number;
  title: string;
  language: LanguageDTO;
  rangeQuestions: RangeQuestionDTO[];
  possibleOutcomes: PossibleOutcomeDTO[];
}

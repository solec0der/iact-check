import { PossibleOutcomeDTO } from './possible-outcome-dto';
import { RangeQuestionDTO } from './range-question-dto';
import { LanguageDTO } from './language-dto';
import { ImageQuestionDTO } from './image-question-dto';
import { PossibleOutcomesDisplayType } from './possible-outcomes-display-type';

export interface QuestionCategoryDTO {
  id: number;
  checkId: number;
  title: string;
  language: LanguageDTO;
  numberOfPossibleOutcomesToShow: number;
  rangeQuestions: RangeQuestionDTO[];
  imageQuestions: ImageQuestionDTO[];
  possibleOutcomes: PossibleOutcomeDTO[];
  possibleOutcomesDisplayType: PossibleOutcomesDisplayType;
}

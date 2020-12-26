import { QuestionDTO } from './question-dto';
import { PossibleOutcomeDTO } from './possible-outcome-dto';

export interface QuestionCategoryDTO {
  id: number;
  checkId: number;
  title: string;
  questions: QuestionDTO[];
  possibleOutcomes: PossibleOutcomeDTO[];
}

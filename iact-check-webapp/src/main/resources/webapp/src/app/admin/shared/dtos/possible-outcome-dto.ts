import { PossibleScoreDTO } from './possible-score-dto';

export interface PossibleOutcomeDTO {
  id: number;
  questionCategoryId: number;
  title: string;
  subtitle: string;
  description: string;
  possibleScores: PossibleScoreDTO[];
}

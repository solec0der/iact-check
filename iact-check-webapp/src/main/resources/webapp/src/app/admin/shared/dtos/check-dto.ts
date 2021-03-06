import { QuestionCategoryDTO } from './question-category-dto';
import { LanguageDTO } from '../../../shared/dtos/language-dto';

export interface CheckDTO {
  id: number;
  customerId: number;
  title: string;
  language: LanguageDTO;
  activeFrom: Date;
  activeTo: Date;
  questionCategories: QuestionCategoryDTO[];
}

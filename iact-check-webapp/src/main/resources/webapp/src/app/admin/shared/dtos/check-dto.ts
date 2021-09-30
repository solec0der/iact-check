import { QuestionCategoryDTO } from './question-category-dto';
import { LanguageDTO } from '../../../shared/dtos/language-dto';

export interface CheckDTO {
  id?: number;
  customerId: number;
  title: { [key: string]: string };
  subtitle: { [key: string]: string };
  requiredLanguages: LanguageDTO[];
  defaultLanguage: LanguageDTO;
  activeFrom: Date;
  activeTo: Date;
  questionCategories: QuestionCategoryDTO[];
}

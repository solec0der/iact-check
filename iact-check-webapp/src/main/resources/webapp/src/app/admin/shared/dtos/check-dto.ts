import { QuestionCategoryDTO } from './question-category-dto';

export interface CheckDTO {
  id: number;
  customerId: number;
  title: string;
  activeFrom: Date;
  activeTo: Date;
  questionCategories: QuestionCategoryDTO[];
}

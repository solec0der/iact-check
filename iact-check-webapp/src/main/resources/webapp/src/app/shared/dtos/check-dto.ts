import { QuestionCategoryDTO } from './question-category-dto';
import { LanguageDTO } from './language-dto';
import { MarketplaceConfigDTO } from './marketplace-config-dto';

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
  marketplaceConfig?: MarketplaceConfigDTO;
}

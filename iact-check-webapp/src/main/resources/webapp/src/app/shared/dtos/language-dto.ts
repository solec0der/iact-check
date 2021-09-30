import { AVAILABLE_LANGUAGES } from '../model/available-languages';

export interface LanguageDTO {
  language: string;
  locale: string;
}

export const DEFAULT_LANGUAGE = getLanguageByLocale('de-CH')!;

export function getLanguageByLocale(locale: string): LanguageDTO | undefined {
  return AVAILABLE_LANGUAGES.find((value) => value.locale === locale);
}

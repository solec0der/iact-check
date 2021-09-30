import { FormArray } from '@angular/forms';

export class TranslationUtil {
  public static convertTranslationsFormArrayToTranslationsMap(
    translationsFormArray: FormArray
  ): { [key: string]: string } {
    const translation: { [key: string]: string } = {};

    translationsFormArray.controls.forEach((formGroup) => {
      translation[formGroup.value.language.locale] = formGroup.value.translation;
    });

    return translation;
  }
}

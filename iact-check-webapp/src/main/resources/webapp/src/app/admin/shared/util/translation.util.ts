import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageDTO } from '../../../shared/dtos/language-dto';

export class TranslationUtil {
  public static createTranslationsFormGroup(
    language: LanguageDTO,
    translation: string,
    required: boolean = true
  ): FormGroup {
    return new FormGroup({
      translation: new FormControl(translation, required ? Validators.required : []),
      language: new FormControl(language, Validators.required),
    });
  }

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

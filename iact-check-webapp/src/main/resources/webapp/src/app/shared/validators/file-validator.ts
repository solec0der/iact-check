import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FileValidator {
  public static maxFileSize(maxFileSizeInMb: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value instanceof File) {
        const file = <File>control.value;
        const fileSizeInMb = file.size / 1000000;

        return fileSizeInMb > maxFileSizeInMb ? { fileSizeLimit: { value: control.value } } : null;
      }
      return null;
    };
  }
}

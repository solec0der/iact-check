import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar, private translateService: TranslateService) {}

  public open(message: string): void {
    this.matSnackBar.open(this.translateService.instant(message), this.translateService.instant('SHARED.CLOSE'), {
      duration: 5000,
    });
  }
}

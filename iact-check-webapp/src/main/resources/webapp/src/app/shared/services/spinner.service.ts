import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private earliestHideTime = Date.now();
  private readonly minSpinningTime = 250;

  private numberOfActiveHttpRequests = 0;

  constructor(private ngxSpinnerService: NgxSpinnerService) {}

  public show(): void {
    this.ngxSpinnerService.show('main');
    this.numberOfActiveHttpRequests++;

    this.earliestHideTime = Date.now() + this.minSpinningTime;
  }

  public hide(): void {
    this.numberOfActiveHttpRequests--;

    const timeToWait = Math.max(0, this.earliestHideTime - Date.now());
    setTimeout(() => {
      if (this.numberOfActiveHttpRequests === 0) {
        this.ngxSpinnerService.hide('main');
      }
    }, timeToWait);
  }
}

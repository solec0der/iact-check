import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../check-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  public currentProgressPercentage$: Observable<number>;

  constructor(private readonly checkStateService: CheckStateService) {
    this.currentProgressPercentage$ = this.checkStateService.getCurrentProgressPercentage();
  }

  ngOnInit(): void {}
}

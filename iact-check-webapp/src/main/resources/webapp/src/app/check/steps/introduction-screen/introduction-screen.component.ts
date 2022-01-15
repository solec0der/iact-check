import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CheckStateService } from '../../check-state.service';
import { Steps } from '../steps';
import { CheckDTO } from '../../../shared/dtos/check-dto';

@Component({
  selector: 'app-introduction-screen',
  templateUrl: './introduction-screen.component.html',
  styleUrls: ['./introduction-screen.component.scss'],
})
export class IntroductionScreenComponent implements OnInit {
  public check!: CheckDTO;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService
  ) {
    this.checkStateService.setStep(Steps.IntroductionScreen, this.activatedRoute);
    this.loadData();
  }

  ngOnInit(): void {}

  public nextStep(): void {
    this.checkStateService.nextStep(this.activatedRoute);
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((check) => {
      this.check = check;
    });
  }
}

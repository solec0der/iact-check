import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PossibleOutcomeDTO } from '../../../../admin/shared/dtos/possible-outcome-dto';

@Component({
  selector: 'app-possible-outcome-detail',
  templateUrl: './possible-outcome-detail.component.html',
  styleUrls: ['./possible-outcome-detail.component.scss'],
})
export class PossibleOutcomeDetailComponent implements OnInit {
  public possibleOutcome: PossibleOutcomeDTO;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: PossibleOutcomeDetailData
  ) {
    this.possibleOutcome = data.possibleOutcome;
  }

  ngOnInit(): void {}
}

export interface PossibleOutcomeDetailData {
  possibleOutcome: PossibleOutcomeDTO;
}

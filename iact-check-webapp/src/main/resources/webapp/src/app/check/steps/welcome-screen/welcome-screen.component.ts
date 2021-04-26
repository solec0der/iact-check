import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { CheckDTO } from '../../../admin/shared/dtos/check-dto';
import { CustomerDTO } from '../../../admin/shared/dtos/customer-dto';
import { ActivatedRoute } from '@angular/router';
import { Steps } from '../steps';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent implements OnInit {
  public customerDTO!: CustomerDTO;
  public checkDTO!: CheckDTO;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.setStep(Steps.WelcomeScreen, this.activatedRoute);
    this.loadData();
  }

  public nextStep(): void {
    this.checkStateService.nextStep(this.activatedRoute);
  }

  private loadData(): void {
    this.checkStateService.getActiveCustomer().subscribe((customerDTO) => {
      this.customerDTO = customerDTO;
    });

    this.checkStateService.getActiveCheck().subscribe((checkDTO) => {
      this.checkDTO = checkDTO;
    });
  }
}

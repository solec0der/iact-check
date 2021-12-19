import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CheckStateService } from '../check-state.service';
import { CustomerService } from '../../shared/services/customer.service';
import { CORE_URL } from '../../app.config';
import { CustomerDTO } from '../../shared/dtos/customer-dto';
import { ThemeService } from '../../shared/services/theme.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  public currentProgressPercentage = 0.0;

  constructor(
    private readonly themeService: ThemeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly customerService: CustomerService,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.getCurrentProgressPercentage().subscribe((currentProgressPercentage) => {
      this.currentProgressPercentage = currentProgressPercentage;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CheckStateService } from '../../check-state.service';
import { CheckDTO } from '../../../shared/dtos/check-dto';
import { CustomerDTO } from '../../../shared/dtos/customer-dto';
import { ActivatedRoute } from '@angular/router';
import { Steps } from '../steps';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, getLanguageByLocale, LanguageDTO } from '../../../shared/dtos/language-dto';
import { FlashCardsStateService } from "../../marketplace/flash-cards/flash-cards-state.service";

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
    private readonly checkStateService: CheckStateService,
    private readonly translateService: TranslateService,
    private readonly flashCardsStateService: FlashCardsStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.setStep(Steps.WelcomeScreen, this.activatedRoute);
    this.checkStateService.resetCheck();
    this.flashCardsStateService.resetFlashCards();
    this.loadData();
  }

  public nextStep(): void {
    this.checkStateService.nextStep(this.activatedRoute);
  }

  public getCurrentLanguage(): LanguageDTO {
    return getLanguageByLocale(this.translateService.currentLang) || DEFAULT_LANGUAGE;
  }

  public changeLanguage(language: string): void {
    this.translateService.use(language);
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

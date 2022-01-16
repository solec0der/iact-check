import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckStateService } from '../../check-state.service';
import { FinalMarketplaceSlideConfigurationDTO } from '../../../shared/dtos/final-marketplace-slide-configuration-dto';
import { FlashCardsStateService } from '../flash-cards/flash-cards-state.service';

@Component({
  selector: 'app-final-marketplace-slide',
  templateUrl: './final-marketplace-slide.component.html',
  styleUrls: ['./final-marketplace-slide.component.scss'],
})
export class FinalMarketplaceSlideComponent implements OnInit {
  public finalMarketplaceSlideConfiguration!: FinalMarketplaceSlideConfigurationDTO;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService,
    private readonly flashCardsStateService: FlashCardsStateService
  ) {
    this.loadData();
  }

  ngOnInit(): void {}

  public resetData(): void {
    this.checkStateService.resetCheck();
    this.flashCardsStateService.resetFlashCards();
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((check) => {
      if (check && check.marketplaceConfig && check.marketplaceConfig.finalMarketplaceSlideConfiguration) {
        this.finalMarketplaceSlideConfiguration = check.marketplaceConfig.finalMarketplaceSlideConfiguration;
      }
    });
  }
}

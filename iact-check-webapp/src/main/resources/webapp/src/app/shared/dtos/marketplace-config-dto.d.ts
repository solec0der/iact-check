import { MarketplaceTileConfigDTO } from './marketplace-tile-config-dto';
import { FinalMarketplaceSlideConfigurationDTO } from './final-marketplace-slide-configuration-dto';

export interface MarketplaceConfigDTO {
  marketplaceEnabled: boolean;
  greetingText: string;
  marketplaceTitle: string;
  marketplaceSubtitle: string;
  marketplaceTileConfigs: MarketplaceTileConfigDTO[];
  finalMarketplaceSlideConfiguration?: FinalMarketplaceSlideConfigurationDTO;
}

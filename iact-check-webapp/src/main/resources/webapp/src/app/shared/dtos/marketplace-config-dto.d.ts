import { MarketplaceTileConfigDTO } from './marketplace-tile-config-dto';

export interface MarketplaceConfigDTO {
  marketplaceEnabled: boolean;
  greetingText: string;
  marketplaceTitle: string;
  marketplaceSubtitle: string;
  marketplaceTileConfigs: MarketplaceTileConfigDTO[];
}

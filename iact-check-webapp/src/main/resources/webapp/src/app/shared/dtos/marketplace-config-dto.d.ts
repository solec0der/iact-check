import { MarketplaceTileConfigDTO } from './marketplace-tile-config-dto';

export interface MarketplaceConfigDTO {
  marketplaceEnabled: boolean;
  marketplaceTileConfigs: MarketplaceTileConfigDTO[];
}

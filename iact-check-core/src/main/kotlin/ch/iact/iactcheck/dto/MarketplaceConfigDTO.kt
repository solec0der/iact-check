package ch.iact.iactcheck.dto

data class MarketplaceConfigDTO(
    val marketplaceEnabled: Boolean,
    val greetingText: String,
    val marketplaceTitle: String,
    val marketplaceSubtitle: String,
    val marketplaceTileConfigs: List<MarketplaceTileConfigDTO>,
    val finalMarketplaceSlideConfiguration: FinalMarketplaceSlideConfigurationDTO
)

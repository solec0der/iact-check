package ch.iact.iactcheck.dto

data class MarketplaceConfigDTO(
    val marketplaceEnabled: Boolean,
    val marketplaceTileConfigs: List<MarketplaceTileConfigDTO>
)

package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.FinalMarketplaceSlideConfiguration
import ch.iact.iactcheck.domain.model.MarketplaceConfig
import ch.iact.iactcheck.domain.model.MarketplaceTileConfig
import ch.iact.iactcheck.dto.DisplayedDocumentGroupDTO
import ch.iact.iactcheck.dto.FinalMarketplaceSlideConfigurationDTO
import ch.iact.iactcheck.dto.MarketplaceConfigDTO
import ch.iact.iactcheck.dto.MarketplaceTileConfigDTO

object MarketplaceConfigMapper {
    fun map(marketplaceConfig: MarketplaceConfig): MarketplaceConfigDTO {
        return MarketplaceConfigDTO(
            marketplaceEnabled = marketplaceConfig.marketplaceEnabled,
            greetingText = marketplaceConfig.greetingText,
            marketplaceTitle = marketplaceConfig.marketplaceTitle,
            marketplaceSubtitle = marketplaceConfig.marketplaceSubtitle,
            marketplaceTileConfigs = marketplaceConfig.marketplaceTileConfigs.map(this::map),
            map(marketplaceConfig.finalMarketplaceSlideConfiguration!!)
        )
    }

    private fun map(marketplaceTileConfig: MarketplaceTileConfig): MarketplaceTileConfigDTO {
        return MarketplaceTileConfigDTO(
            tileTitle = marketplaceTileConfig.tileTitle,
            tileIcon = marketplaceTileConfig.tileIcon,
            documentGroupListTitle = marketplaceTileConfig.documentGroupListTitle,
            documentGroupListSubtitle = marketplaceTileConfig.documentGroupListSubtitle,
            documentGroupsDisplayType = marketplaceTileConfig.documentGroupsDisplayType.name,
            documentGroupsTilesPerRow = marketplaceTileConfig.documentGroupsTilesPerRow,
            documentsTableColumnName = marketplaceTileConfig.documentsTableColumnName,
            displayedDocumentGroups = marketplaceTileConfig.displayedDocumentGroups.map {
                DisplayedDocumentGroupDTO(it.documentGroup.id, it.position)
            }.sortedBy(DisplayedDocumentGroupDTO::position).toSet()
        )
    }

    private fun map(finalMarketplaceSlideConfiguration: FinalMarketplaceSlideConfiguration): FinalMarketplaceSlideConfigurationDTO {
        return FinalMarketplaceSlideConfigurationDTO(
            showFinalSlide = finalMarketplaceSlideConfiguration.showFinalSlide,
            title = finalMarketplaceSlideConfiguration.title,
            subtitle = finalMarketplaceSlideConfiguration.subtitle,
            text = finalMarketplaceSlideConfiguration.text
        )
    }
}

package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.DocumentGroup
import ch.iact.iactcheck.domain.model.MarketplaceConfig
import ch.iact.iactcheck.domain.model.MarketplaceTileConfig
import ch.iact.iactcheck.dto.MarketplaceConfigDTO
import ch.iact.iactcheck.dto.MarketplaceTileConfigDTO

object MarketplaceConfigMapper {
    fun map(marketplaceConfig: MarketplaceConfig): MarketplaceConfigDTO {
        return MarketplaceConfigDTO(
            marketplaceEnabled = marketplaceConfig.marketplaceEnabled,
            marketplaceTileConfigs = marketplaceConfig.marketplaceTileConfigs.map(this::map)
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
            displayedDocumentGroups = marketplaceTileConfig.displayedDocumentGroups.map(DocumentGroup::id).toSet()
        )
    }
}

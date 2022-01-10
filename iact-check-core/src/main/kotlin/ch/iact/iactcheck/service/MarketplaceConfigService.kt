package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.DocumentGroupNotFoundException
import ch.iact.iactcheck.controller.exception.MarketplaceConfigNotFoundException
import ch.iact.iactcheck.domain.model.DocumentGroupsDisplayType
import ch.iact.iactcheck.domain.model.MarketplaceTileConfig
import ch.iact.iactcheck.domain.repository.DocumentGroupRepository
import ch.iact.iactcheck.domain.repository.MarketplaceConfigRepository
import ch.iact.iactcheck.dto.MarketplaceConfigDTO
import ch.iact.iactcheck.service.converter.MarketplaceConfigMapper
import org.springframework.stereotype.Service

@Service
class MarketplaceConfigService(
    private val documentGroupRepository: DocumentGroupRepository,
    private val marketplaceConfigRepository: MarketplaceConfigRepository
) {

    fun updateMarketplaceConfigForCheck(
        checkId: Long,
        marketplaceConfigDTO: MarketplaceConfigDTO
    ): MarketplaceConfigDTO {
        var marketplaceConfig = marketplaceConfigRepository.findByCheckId(checkId)
            .orElseThrow { throw MarketplaceConfigNotFoundException() }

        marketplaceConfig = marketplaceConfig.copy(
            marketplaceEnabled = marketplaceConfigDTO.marketplaceEnabled,
            marketplaceTileConfigs = marketplaceConfigDTO.marketplaceTileConfigs.map {
                MarketplaceTileConfig(
                    tileTitle = it.tileTitle,
                    tileIcon = it.tileIcon,
                    documentGroupListTitle = it.documentGroupListTitle,
                    documentGroupListSubtitle = it.documentGroupListSubtitle,
                    documentGroupsDisplayType = DocumentGroupsDisplayType.valueOf(it.documentGroupsDisplayType),
                    documentsTableColumnName = it.documentsTableColumnName,
                    documentGroupsTilesPerRow = it.documentGroupsTilesPerRow,
                    displayedDocumentGroups = it.displayedDocumentGroups.map { documentGroupId ->
                        documentGroupRepository.findById(documentGroupId)
                            .orElseThrow { throw DocumentGroupNotFoundException() }
                    }.toSet(),
                    marketplaceConfig = marketplaceConfig
                )
            }
        )
        return MarketplaceConfigMapper.map(marketplaceConfigRepository.save(marketplaceConfig));
    }
}

package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.DocumentGroupNotFoundException
import ch.iact.iactcheck.controller.exception.MarketplaceConfigNotFoundException
import ch.iact.iactcheck.domain.model.DisplayedDocumentGroup
import ch.iact.iactcheck.domain.model.DocumentGroupsDisplayType
import ch.iact.iactcheck.domain.model.FinalMarketplaceSlideConfiguration
import ch.iact.iactcheck.domain.model.MarketplaceTileConfig
import ch.iact.iactcheck.domain.repository.DocumentGroupRepository
import ch.iact.iactcheck.domain.repository.MarketplaceConfigRepository
import ch.iact.iactcheck.domain.repository.MarketplaceTileConfigRepository
import ch.iact.iactcheck.dto.FinalMarketplaceSlideConfigurationDTO
import ch.iact.iactcheck.dto.MarketplaceConfigDTO
import ch.iact.iactcheck.service.converter.MarketplaceConfigMapper
import org.springframework.stereotype.Service

@Service
class MarketplaceConfigService(
    private val documentGroupRepository: DocumentGroupRepository,
    private val marketplaceConfigRepository: MarketplaceConfigRepository,
    private val marketplaceTileConfigRepository: MarketplaceTileConfigRepository
) {

    fun updateMarketplaceConfigForCheck(
        checkId: Long,
        marketplaceConfigDTO: MarketplaceConfigDTO
    ): MarketplaceConfigDTO {
        var marketplaceConfig = marketplaceConfigRepository.findByCheckId(checkId)
            .orElseThrow { throw MarketplaceConfigNotFoundException() }

        val finalMarketplaceSlideConfiguration = FinalMarketplaceSlideConfiguration(
            id = -1,
            showFinalSlide = marketplaceConfigDTO.finalMarketplaceSlideConfiguration.showFinalSlide,
            title = marketplaceConfigDTO.finalMarketplaceSlideConfiguration.title,
            subtitle = marketplaceConfigDTO.finalMarketplaceSlideConfiguration.subtitle,
            text = marketplaceConfigDTO.finalMarketplaceSlideConfiguration.text,
            marketplaceConfig = marketplaceConfig
        )

        marketplaceConfig = marketplaceConfig.copy(
            marketplaceEnabled = marketplaceConfigDTO.marketplaceEnabled,
            greetingText = marketplaceConfigDTO.greetingText,
            marketplaceTitle = marketplaceConfigDTO.marketplaceTitle,
            marketplaceSubtitle = marketplaceConfigDTO.marketplaceSubtitle,
            finalMarketplaceSlideConfiguration = finalMarketplaceSlideConfiguration,
            marketplaceTileConfigs = marketplaceConfigDTO.marketplaceTileConfigs.map {
                var marketplaceTileConfig = marketplaceTileConfigRepository.save(
                    MarketplaceTileConfig(
                        tileTitle = it.tileTitle,
                        tileIcon = it.tileIcon,
                        documentGroupListTitle = it.documentGroupListTitle,
                        documentGroupListSubtitle = it.documentGroupListSubtitle,
                        documentGroupsDisplayType = DocumentGroupsDisplayType.valueOf(it.documentGroupsDisplayType),
                        documentsTableColumnName = it.documentsTableColumnName,
                        documentGroupsTilesPerRow = it.documentGroupsTilesPerRow,
                        displayedDocumentGroups = ArrayList(),
                        marketplaceConfig = marketplaceConfig
                    )
                )

                marketplaceTileConfig = marketplaceTileConfig.copy(
                    displayedDocumentGroups = it.displayedDocumentGroups.map { displayedDocumentGroup ->
                        val documentGroup = documentGroupRepository.findById(displayedDocumentGroup.documentGroupId)
                            .orElseThrow { throw DocumentGroupNotFoundException() }

                        DisplayedDocumentGroup(
                            id = -1,
                            documentGroup = documentGroup,
                            position = displayedDocumentGroup.position,
                            marketplaceTileConfig = marketplaceTileConfig
                        )
                    }.toList(),
                )
                marketplaceTileConfig
            }
        )
        return MarketplaceConfigMapper.map(marketplaceConfigRepository.save(marketplaceConfig));
    }
}

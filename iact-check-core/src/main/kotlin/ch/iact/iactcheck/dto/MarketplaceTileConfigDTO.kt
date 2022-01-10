package ch.iact.iactcheck.dto

data class MarketplaceTileConfigDTO(
    val displayedDocumentGroups: Set<Long>,
    val tileTitle: String,
    val tileIcon: String,
    val documentGroupListTitle: String,
    val documentGroupListSubtitle: String,
    val documentGroupsTilesPerRow: Int,
    val documentGroupsDisplayType: String,
    val documentsTableColumnName: String
)

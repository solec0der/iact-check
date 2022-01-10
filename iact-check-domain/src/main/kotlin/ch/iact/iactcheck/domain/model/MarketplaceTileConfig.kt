package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "marketplace_tile_config")
data class MarketplaceTileConfig(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = -1,

    @ManyToMany
    @JoinTable(
        name = "displayed_document_group",
        joinColumns = [JoinColumn(name = "marketplace_tile_config_id")],
        inverseJoinColumns = [JoinColumn(name = "document_group_id")]
    )
    val displayedDocumentGroups: Set<DocumentGroup>,

    val tileTitle: String,
    val tileIcon: String,
    val documentGroupListTitle: String,
    val documentGroupListSubtitle: String,
    val documentGroupsTilesPerRow: Int,

    @Enumerated(EnumType.STRING)
    val documentGroupsDisplayType: DocumentGroupsDisplayType,
    val documentsTableColumnName: String,

    @ManyToOne
    val marketplaceConfig: MarketplaceConfig
)

package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "marketplace_tile_config")
data class MarketplaceTileConfig(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @OneToMany(
        targetEntity = DisplayedDocumentGroup::class,
        mappedBy = "marketplaceTileConfig",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val displayedDocumentGroups: List<DisplayedDocumentGroup>,

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

package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "marketplace_config")
data class MarketplaceConfig(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val marketplaceEnabled: Boolean,
    val greetingText: String,
    val marketplaceTitle: String,
    val marketplaceSubtitle: String,

    @OneToMany(
        targetEntity = MarketplaceTileConfig::class,
        mappedBy = "marketplaceConfig",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val marketplaceTileConfigs: List<MarketplaceTileConfig>,

    @OneToOne
    @JoinColumn(name = "check_id")
    val check: Check
)

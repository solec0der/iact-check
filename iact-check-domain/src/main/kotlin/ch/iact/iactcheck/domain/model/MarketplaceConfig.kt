package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "marketplace_config")
data class MarketplaceConfig(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val marketplaceEnabled: Boolean,

    @OneToMany(targetEntity = MarketplaceTileConfig::class, mappedBy = "marketplaceConfig")
    val marketplaceTileConfigs: List<MarketplaceTileConfig>,

    @OneToOne
    @JoinColumn(name = "check_id")
    val check: Check
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as MarketplaceConfig

        if (id != other.id) return false
        if (marketplaceEnabled != other.marketplaceEnabled) return false
        if (marketplaceTileConfigs != other.marketplaceTileConfigs) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + marketplaceEnabled.hashCode()
        result = 31 * result + marketplaceTileConfigs.hashCode()
        return result
    }
}

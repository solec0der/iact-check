package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "final_marketplace_slide_configuration")
data class FinalMarketplaceSlideConfiguration(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    val showFinalSlide: Boolean,
    val title: String? = null,
    val subtitle: String? = null,
    val text: String? = null,

    @OneToOne
    @JoinColumn(name = "marketplace_config_id")
    val marketplaceConfig: MarketplaceConfig
)

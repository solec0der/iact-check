package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.MarketplaceConfig
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface MarketplaceConfigRepository : JpaRepository<MarketplaceConfig, Long> {
    fun findByCheckId(checkId: Long): Optional<MarketplaceConfig>
}

package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.MarketplaceTileConfig
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MarketplaceTileConfigRepository : JpaRepository<MarketplaceTileConfig, Long>

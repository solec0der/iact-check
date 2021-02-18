package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.TextMessageSettings
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TextMessageSettingsRepository: JpaRepository<TextMessageSettings, Long> {
    fun findByCustomerId(customerId: Long): Optional<TextMessageSettings>
}
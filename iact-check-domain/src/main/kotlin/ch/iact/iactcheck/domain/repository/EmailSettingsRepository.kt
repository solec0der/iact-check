package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.EmailSettings
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface EmailSettingsRepository : JpaRepository<EmailSettings, Long> {
    fun findByCustomerId(customerId: Long): Optional<EmailSettings>
}

package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.ActiveUserRegistrationField
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ActiveUserRegistrationFieldRepository : JpaRepository<ActiveUserRegistrationField, Long> {
    fun deleteAllByCustomerId(customerId: Long)
}
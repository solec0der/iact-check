package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.Check
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CheckRepository : JpaRepository<Check, Long> {

    fun findAllByCustomerId(customerId: Long): List<Check>

}

package ch.showlab.showlabcheck.domain.repository

import ch.showlab.showlabcheck.domain.model.Check
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CheckRepository : JpaRepository<Check, Long> {

    fun findAllByCustomerId(customerId: Long): List<Check>

}

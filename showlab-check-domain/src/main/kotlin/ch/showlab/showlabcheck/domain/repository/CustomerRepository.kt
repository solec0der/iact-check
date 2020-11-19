package ch.showlab.showlabcheck.domain.repository

import ch.showlab.showlabcheck.domain.model.Customer
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface CustomerRepository : JpaRepository<Customer, Long> {
    fun existsByName(name: String): Boolean

    fun findAllByUsersWithAccess(@Param("userId") userId: String): List<Customer>
}

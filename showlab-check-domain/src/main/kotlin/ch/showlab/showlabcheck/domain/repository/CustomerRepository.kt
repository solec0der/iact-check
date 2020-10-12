package ch.showlab.showlabcheck.domain.repository

import ch.showlab.showlabcheck.domain.model.Customer
import ch.showlab.showlabcheck.domain.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface CustomerRepository : JpaRepository<Customer, Long> {
    fun existsByName(name: String): Boolean

    @Query("SELECT DISTINCT c FROM Customer c JOIN c.users user JOIN user.accessibleCustomers customer WHERE user.id = :userId")
    fun findAllByUserId(@Param("userId") userId: Long): List<Customer>
}

package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.CustomerBranding
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CustomerBrandingRepository : JpaRepository<CustomerBranding, Long>

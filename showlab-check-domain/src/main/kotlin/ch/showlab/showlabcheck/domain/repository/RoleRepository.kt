package ch.showlab.showlabcheck.domain.repository

import ch.showlab.showlabcheck.domain.model.Role
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RoleRepository : JpaRepository<Role, Long>

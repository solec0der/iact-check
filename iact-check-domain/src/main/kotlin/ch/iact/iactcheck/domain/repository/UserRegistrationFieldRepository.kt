package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.UserRegistrationField
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRegistrationFieldRepository : JpaRepository<UserRegistrationField, Long>
package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.DocumentGroup
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface DocumentGroupRepository : JpaRepository<DocumentGroup, Long> {

    fun findAllByCheckId(checkId: Long): List<DocumentGroup>
}

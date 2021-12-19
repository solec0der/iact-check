package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.Document
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DocumentRepository : JpaRepository<Document, Long>

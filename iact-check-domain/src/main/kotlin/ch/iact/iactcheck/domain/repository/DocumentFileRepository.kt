package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.DocumentFile
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DocumentFileRepository : JpaRepository<DocumentFile, Long>

package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.QuestionCategory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface QuestionCategoryRepository : JpaRepository<QuestionCategory, Long>

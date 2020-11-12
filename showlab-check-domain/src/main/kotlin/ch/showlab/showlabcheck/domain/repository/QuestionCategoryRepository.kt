package ch.showlab.showlabcheck.domain.repository

import ch.showlab.showlabcheck.domain.model.QuestionCategory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface QuestionCategoryRepository : JpaRepository<QuestionCategory, Long>

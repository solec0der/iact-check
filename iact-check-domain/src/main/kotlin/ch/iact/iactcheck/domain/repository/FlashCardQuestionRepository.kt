package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.FlashCardQuestion
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FlashCardQuestionRepository : JpaRepository<FlashCardQuestion, Long> {
    fun findByCheckId(checkId: Long): List<FlashCardQuestion>
}

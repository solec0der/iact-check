package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.RangeQuestion
import org.springframework.data.jpa.repository.JpaRepository

interface RangeQuestionRepository : JpaRepository<RangeQuestion, Long>

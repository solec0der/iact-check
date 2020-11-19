package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.Question
import org.springframework.data.jpa.repository.JpaRepository

interface QuestionRepository : JpaRepository<Question, Long>

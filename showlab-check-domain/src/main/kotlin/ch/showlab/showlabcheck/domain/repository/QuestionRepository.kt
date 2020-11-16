package ch.showlab.showlabcheck.domain.repository

import ch.showlab.showlabcheck.domain.model.Question
import org.springframework.data.jpa.repository.JpaRepository

interface QuestionRepository : JpaRepository<Question, Long>

package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.ImageQuestion
import org.springframework.data.jpa.repository.JpaRepository

interface ImageQuestionRepository : JpaRepository<ImageQuestion, Long>

package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.ImageAnswer
import org.springframework.data.jpa.repository.JpaRepository

interface ImageAnswerRepository : JpaRepository<ImageAnswer, Long>

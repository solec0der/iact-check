package ch.iact.iactcheck.dto

import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime

data class CheckDTO(
        val id: Long,
        val customerId: Long,
        val title: String,
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'hh:mm:ss")
        val activeFrom: LocalDateTime,
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'hh:mm:ss")
        val activeTo: LocalDateTime,
        val questionCategories: List<QuestionCategoryDTO>
)

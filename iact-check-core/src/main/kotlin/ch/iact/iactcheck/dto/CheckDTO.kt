package ch.iact.iactcheck.dto

import org.springframework.format.annotation.DateTimeFormat
import java.time.Instant

data class CheckDTO(
    val id: Long,
    val customerId: Long,
    val title: String,
    val language: LanguageDTO,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    val activeFrom: Instant,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    val activeTo: Instant,
    val questionCategories: List<QuestionCategoryDTO>
)

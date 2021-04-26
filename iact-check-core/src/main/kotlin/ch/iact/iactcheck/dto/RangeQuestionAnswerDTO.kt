package ch.iact.iactcheck.dto

data class RangeQuestionAnswerDTO(
    val id: Long,
    val rangeQuestionId: Long,
    val questionCategoryId: Long = -1,
    val value: Int
)

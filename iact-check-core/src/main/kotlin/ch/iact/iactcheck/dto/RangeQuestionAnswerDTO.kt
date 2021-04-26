package ch.iact.iactcheck.dto

data class RangeQuestionAnswerDTO(
    val id: Long,
    val rangeQuestionId: Long,
    val rangeQuestionCategoryId: Long = -1,
    val value: Int
)

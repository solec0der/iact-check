package ch.iact.iactcheck.dto

data class RangeStepDTO(
    val id: Long,
    val rangeQuestionId: Long,
    val score: Int,
    val description: String?
)

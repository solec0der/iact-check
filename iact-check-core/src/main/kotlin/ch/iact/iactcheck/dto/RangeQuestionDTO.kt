package ch.iact.iactcheck.dto

data class RangeQuestionDTO(
    val id: Long = -1,
    val questionCategoryId: Long,
    val questionText: String,
    val rangeSteps: List<RangeStepDTO>
)

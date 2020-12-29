package ch.iact.iactcheck.dto

data class RangeQuestionDTO(
        val id: Long,
        val questionCategoryId: Long,
        val questionText: String,
        val rangeSteps: List<RangeStepDTO>
)

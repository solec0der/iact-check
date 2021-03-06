package ch.iact.iactcheck.dto

data class QuestionCategoryDTO(
    val id: Long,
    val checkId: Long,
    val title: String,
    val rangeQuestions: List<RangeQuestionDTO>,
    val possibleOutcomes: List<PossibleOutcomeDTO>
)

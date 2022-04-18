package ch.iact.iactcheck.dto

data class QuestionCategoryDTO(
    val id: Long,
    val checkId: Long,
    val title: String,
    val language: LanguageDTO,
    val numberOfPossibleOutcomesToShow: Int,
    val rangeQuestions: List<RangeQuestionDTO>,
    val imageQuestions: List<ImageQuestionDTO>,
    val possibleOutcomes: List<PossibleOutcomeDTO>,
    val possibleOutcomesDisplayType: String
)

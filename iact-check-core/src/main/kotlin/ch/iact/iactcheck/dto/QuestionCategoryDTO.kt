package ch.iact.iactcheck.dto

data class QuestionCategoryDTO(
    val id: Long,
    val checkId: Long,
    val title: String,
    val language: LanguageDTO,
    val numberOfPossibleOutcomesToShow: Int,
    val rangeQuestions: List<RangeQuestionDTO>, // Only RangeQuestions xor ImageQuestions can be used
    val imageQuestions: List<ImageQuestionDTO>,
    val possibleOutcomes: List<PossibleOutcomeDTO>
)

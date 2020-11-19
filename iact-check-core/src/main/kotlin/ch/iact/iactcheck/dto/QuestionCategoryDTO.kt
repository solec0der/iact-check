package ch.iact.iactcheck.dto

data class QuestionCategoryDTO(
        val id: Long,
        val checkId: Long,
        val title: String,
        val questions: List<QuestionDTO>,
        val possibleOutcomes: List<PossibleOutcomeDTO>
)
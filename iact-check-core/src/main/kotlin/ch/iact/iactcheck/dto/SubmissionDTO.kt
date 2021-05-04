package ch.iact.iactcheck.dto

data class SubmissionDTO(
    val id: Long,
    val correlatingCheckId: Long,
    val firstName: String,
    val lastName: String,
    val street: String,
    val zipCode: String,
    val city: String,
    val phoneNumber: String,
    val email: String,
    val rangeQuestionAnswers: List<RangeQuestionAnswerDTO> = emptyList(),
    val bookmarkedPossibleOutcomes: List<BookmarkedPossibleOutcomeDTO> = emptyList()
)

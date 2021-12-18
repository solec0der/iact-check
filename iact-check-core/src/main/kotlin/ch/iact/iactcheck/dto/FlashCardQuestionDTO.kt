package ch.iact.iactcheck.dto

data class FlashCardQuestionDTO(
    val id: Long,
    val checkId: Long,
    val question: String,
    val allowMultipleAnswers: Boolean,
    val answers: List<FlashCardAnswerDTO>
)

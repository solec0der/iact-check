package ch.iact.iactcheck.dto

data class FlashCardAnswerDTO(
    val id: Long,
    val answer: String,
    val correctAnswer: Boolean
)

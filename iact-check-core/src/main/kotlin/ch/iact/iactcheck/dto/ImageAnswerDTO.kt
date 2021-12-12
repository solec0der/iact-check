package ch.iact.iactcheck.dto

data class ImageAnswerDTO(
    val id: Long = -1,
    val imageQuestionId: Long,
    val possibleOutcomeId: Long
)

package ch.iact.iactcheck.dto

data class ImageQuestionAnswerDTO(
    val id: Long,
    val imageQuestionId: Long,
    val questionCategoryId: Long = -1,
    val value: Int
)

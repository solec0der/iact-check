package ch.iact.iactcheck.dto

data class ImageQuestionAnswerDTO(
    val id: Long,
    val questionCategoryId: Long = -1,
    val imageQuestionId: Long,
    val imageAnswerId: Long,
    val value: Int
)

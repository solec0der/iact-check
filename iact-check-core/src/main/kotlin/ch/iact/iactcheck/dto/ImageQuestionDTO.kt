package ch.iact.iactcheck.dto

data class ImageQuestionDTO(
    val id: Long,
    val questionCategoryId: Long,
    val questionText: String,
    val imageAnswers: List<ImageAnswerDTO>
)

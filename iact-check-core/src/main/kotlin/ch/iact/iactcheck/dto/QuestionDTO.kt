package ch.iact.iactcheck.dto

data class QuestionDTO(
        val id: Long,
        val questionCategoryId: Long,
        val questionText: String,
        val minScore: Int,
        val maxScore: Int
)

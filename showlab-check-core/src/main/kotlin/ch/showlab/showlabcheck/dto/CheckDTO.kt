package ch.showlab.showlabcheck.dto

data class CheckDTO(
        val id: Long,
        val customerId: Long,
        val title: String,
        val questionCategories: List<QuestionCategoryDTO>
)

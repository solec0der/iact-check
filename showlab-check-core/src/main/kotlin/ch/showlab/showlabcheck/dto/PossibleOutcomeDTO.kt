package ch.showlab.showlabcheck.dto

data class PossibleOutcomeDTO(
        val id: Long,
        val questionCategoryId: Long,
        val title: String,
        val description: String,
        val possibleScores: List<PossibleScoreDTO>
)

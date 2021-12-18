package ch.iact.iactcheck.dto

data class PossibleOutcomeDTO(
    val id: Long,
    val questionCategoryId: Long,
    val title: String,
    val subtitle: String,
    val description: String,
    val youtubeUrl: String? = null,
    val backgroundColour: String? = null,
    val possibleScores: List<PossibleScoreDTO>
)

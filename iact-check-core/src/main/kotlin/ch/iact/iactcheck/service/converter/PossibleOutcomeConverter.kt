package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.PossibleOutcome
import ch.iact.iactcheck.dto.PossibleOutcomeDTO

object PossibleOutcomeConverter {

    fun convertPossibleOutcomeToDTO(possibleOutcome: PossibleOutcome): PossibleOutcomeDTO {
        return PossibleOutcomeDTO(
                id = possibleOutcome.id,
                questionCategoryId = possibleOutcome.questionCategory.id,
                title = possibleOutcome.title,
                subtitle = possibleOutcome.subtitle,
                description = possibleOutcome.description,
                youtubeUrl = possibleOutcome.youtubeUrl,
                possibleScores = possibleOutcome.possibleScores.map {
                    PossibleScoreConverter.convertPossibleScoreToDTO(it)
                }.toList()
        )
    }
}

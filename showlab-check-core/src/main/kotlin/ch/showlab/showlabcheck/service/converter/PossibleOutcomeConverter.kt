package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.domain.model.PossibleOutcome
import ch.showlab.showlabcheck.dto.PossibleOutcomeDTO

object PossibleOutcomeConverter {

    fun convertPossibleOutcomeToDTO(possibleOutcome: PossibleOutcome): PossibleOutcomeDTO{
        return PossibleOutcomeDTO(
                id = possibleOutcome.id,
                questionCategoryId = possibleOutcome.questionCategory.id,
                title = possibleOutcome.title,
                subtitle = possibleOutcome.subtitle,
                description = possibleOutcome.description,
                possibleScores = possibleOutcome.possibleScores.map {
                    PossibleScoreConverter.convertPossibleScoreToDTO(it)
                }.toList()
        )
    }
}

package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.domain.model.PossibleScore
import ch.showlab.showlabcheck.dto.PossibleScoreDTO

object PossibleScoreConverter {

    fun convertPossibleScoreToDTO(possibleScore: PossibleScore): PossibleScoreDTO {
        return PossibleScoreDTO(
                id = possibleScore.id,
                possibleOutcomeId = possibleScore.possibleOutcome.id,
                score = possibleScore.score
        )
    }
}

package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.PossibleScore
import ch.iact.iactcheck.dto.PossibleScoreDTO

object PossibleScoreConverter {

    fun convertPossibleScoreToDTO(possibleScore: PossibleScore): PossibleScoreDTO {
        return PossibleScoreDTO(
            id = possibleScore.id,
            score = possibleScore.score
        )
    }
}

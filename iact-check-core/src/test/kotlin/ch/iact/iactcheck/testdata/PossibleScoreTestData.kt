package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.PossibleScore
import ch.iact.iactcheck.dto.PossibleScoreDTO

object PossibleScoreTestData {

    val possibleScore = PossibleScore(
            id = 1L,
            score = 10,
            possibleOutcome = PossibleOutcomeTestData.possibleOutcome
    )

    val possibleScoreDTO = PossibleScoreDTO(
            id = 1L,
            score = 10,
            possibleOutcomeId = 1L
    )
}
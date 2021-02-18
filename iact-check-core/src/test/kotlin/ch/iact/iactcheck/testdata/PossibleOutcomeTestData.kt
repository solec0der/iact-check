package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.PossibleOutcome
import ch.iact.iactcheck.dto.PossibleOutcomeDTO

object PossibleOutcomeTestData {

    val possibleOutcome = PossibleOutcome(
        id = 1L,
        title = "Software-Engineer",
        subtitle = "You will be a software engineer",
        description = "In this job, you will have to do stuff.",
        questionCategory = QuestionCategoryTestData.questionCategory,
        possibleScores = emptyList()
    )

    val possibleOutcomeWithPossibleScores = PossibleOutcome(
        id = 1L,
        title = "Software-Engineer",
        subtitle = "You will be a software engineer",
        description = "In this job, you will have to do stuff.",
        questionCategory = QuestionCategoryTestData.questionCategory,
        possibleScores = listOf(PossibleScoreTestData.possibleScore)
    )

    val possibleOutcomeDTO = PossibleOutcomeDTO(
        id = 1L,
        title = "Software-Engineer",
        subtitle = "You will be a software engineer",
        description = "In this job, you will have to do stuff.",
        questionCategoryId = 1L,
        possibleScores = emptyList()
    )

    val possibleOutcomeDTOWithPossibleScores = PossibleOutcomeDTO(
        id = 1L,
        title = "Software-Engineer",
        subtitle = "You will be a software engineer",
        description = "In this job, you will have to do stuff.",
        questionCategoryId = 1L,
        possibleScores = listOf(PossibleScoreTestData.possibleScoreDTO)
    )
}

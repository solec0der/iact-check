package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.QuestionCategory
import ch.iact.iactcheck.dto.QuestionCategoryDTO

object QuestionCategoryTestData {

    val questionCategory = QuestionCategory(
        id = 1L,
        title = "Technology",
        thumbnail = ByteArray(100),
        check = CheckTestData.check,
        rangeQuestions = emptyList(),
        possibleOutcomes = emptyList()
    )

    val questionCategoryWithPossibleOutcomesAndQuestions = QuestionCategory(
        id = 1L,
        title = "Technology",
        thumbnail = ByteArray(100),
        check = CheckTestData.check,
        rangeQuestions = listOf(RangeQuestionTestData.question),
        possibleOutcomes = listOf(PossibleOutcomeTestData.possibleOutcome)
    )

    val questionCategoryDTO = QuestionCategoryDTO(
        id = 1L,
        title = "Technology",
        checkId = 1L,
        rangeQuestions = emptyList(),
        possibleOutcomes = emptyList()
    )

    val questionCategoryDTOWithPossibleOutcomesAndQuestions = QuestionCategoryDTO(
        id = 1L,
        title = "Technology",
        checkId = 1L,
        rangeQuestions = listOf(RangeQuestionTestData.questionDTO),
        possibleOutcomes = listOf(PossibleOutcomeTestData.possibleOutcomeDTO)
    )
}

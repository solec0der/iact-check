package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.Language
import ch.iact.iactcheck.domain.model.QuestionCategory
import ch.iact.iactcheck.dto.LanguageDTO
import ch.iact.iactcheck.dto.QuestionCategoryDTO

object QuestionCategoryTestData {

    val questionCategory = QuestionCategory(
        id = 1L,
        title = "Technology",
        thumbnail = ByteArray(100),
        language = Language.GERMAN,
        check = CheckTestData.check,
        rangeQuestions = emptyList(),
        imageQuestions = emptyList(),
        possibleOutcomes = emptyList()
    )

    val questionCategoryWithPossibleOutcomesAndQuestions = QuestionCategory(
        id = 1L,
        title = "Technology",
        thumbnail = ByteArray(100),
        language = Language.GERMAN,
        check = CheckTestData.check,
        rangeQuestions = listOf(RangeQuestionTestData.question),
        imageQuestions = emptyList(),
        possibleOutcomes = listOf(PossibleOutcomeTestData.possibleOutcome)
    )

    val questionCategoryDTO = QuestionCategoryDTO(
        id = 1L,
        title = "Technology",
        checkId = 1L,
        language = LanguageDTO(
            language = "GERMAN",
            locale = "de-CH"
        ),
        rangeQuestions = emptyList(),
        imageQuestions = emptyList(),
        possibleOutcomes = emptyList()
    )

    val questionCategoryDTOWithPossibleOutcomesAndQuestions = QuestionCategoryDTO(
        id = 1L,
        title = "Technology",
        language = LanguageDTO(
            language = "GERMAN",
            locale = "de-CH"
        ),
        checkId = 1L,
        rangeQuestions = listOf(RangeQuestionTestData.questionDTO),
        imageQuestions = emptyList(),
        possibleOutcomes = listOf(PossibleOutcomeTestData.possibleOutcomeDTO)
    )
}

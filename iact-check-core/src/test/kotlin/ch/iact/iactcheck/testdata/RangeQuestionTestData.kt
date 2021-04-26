package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.RangeQuestion
import ch.iact.iactcheck.dto.RangeQuestionDTO

object RangeQuestionTestData {

    val question = RangeQuestion(
        id = 1L,
        questionText = "Do you like programming?",
        rangeSteps = emptyList(),
        icon = ByteArray(100),
        questionCategory = QuestionCategoryTestData.questionCategory,
        rangeQuestionAnswer = emptyList()
    )

    val questionDTO = RangeQuestionDTO(
        id = 1L,
        questionText = "Do you like programming?",
        rangeSteps = emptyList(),
        questionCategoryId = 1L
    )
}

package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.Question
import ch.iact.iactcheck.dto.QuestionDTO

object QuestionTestData {

    val question = Question(
            id = 1L,
            questionText = "Do you like programming?",
            minScore = 1,
            maxScore = 5,
            icon = ByteArray(100),
            questionCategory = QuestionCategoryTestData.questionCategory
    )

    val questionDTO = QuestionDTO(
            id = 1L,
            questionText = "Do you like programming?",
            minScore = 1,
            maxScore = 5,
            questionCategoryId = 1L
    )
}
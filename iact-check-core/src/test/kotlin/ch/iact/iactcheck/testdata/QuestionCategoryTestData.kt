package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.QuestionCategory
import ch.iact.iactcheck.dto.QuestionCategoryDTO

object QuestionCategoryTestData {

    val questionCategory = QuestionCategory(
            id = 1L,
            title = "Technology",
            thumbnail = ByteArray(100),
            check = CheckTestData.check,
            questions = emptyList(),
            possibleOutcomes = emptyList()
    )

    val questionCategoryDTO = QuestionCategoryDTO(
            id = 1L,
            title = "Technology",
            checkId = 1L,
            questions = emptyList(),
            possibleOutcomes = emptyList()
    )
}
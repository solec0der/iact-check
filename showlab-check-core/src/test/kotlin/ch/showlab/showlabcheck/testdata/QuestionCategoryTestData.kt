package ch.showlab.showlabcheck.testdata

import ch.showlab.showlabcheck.domain.model.Check
import ch.showlab.showlabcheck.domain.model.QuestionCategory
import ch.showlab.showlabcheck.dto.QuestionCategoryDTO
import java.time.LocalDateTime

object QuestionCategoryTestData {

    val questionCategory = QuestionCategory(
            id = 1L,
            title = "Technology",
            check = Check(
                    id = 1L,
                    customer = CustomerTestData.customer,
                    title = "Check One",
                    activeFrom = LocalDateTime.parse("2020-01-01T09:00:00"),
                    activeTo = LocalDateTime.parse("2020-01-10T09:00:00"),
                    questionCategories = emptyList()
            ),
            thumbnail = ByteArray(100),
            questions = emptyList(),
            possibleOutcomes = emptyList()
    )

    val questionCategory2 = QuestionCategory(
            id = 2L,
            title = "Science",
            check = Check(
                    id = 1L,
                    customer = CustomerTestData.customer,
                    title = "Check One",
                    activeFrom = LocalDateTime.parse("2020-01-01T09:00:00"),
                    activeTo = LocalDateTime.parse("2020-01-10T09:00:00"),
                    questionCategories = emptyList()
            ),
            thumbnail = ByteArray(100),
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

    val questionCategory2DTO = QuestionCategoryDTO(
            id = 2L,
            title = "Science",
            checkId = 1L,
            questions = emptyList(),
            possibleOutcomes = emptyList()
    )
}

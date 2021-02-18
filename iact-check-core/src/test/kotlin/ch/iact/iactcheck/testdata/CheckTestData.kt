package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.Check
import ch.iact.iactcheck.domain.model.Language
import ch.iact.iactcheck.dto.CheckDTO
import ch.iact.iactcheck.dto.LanguageDTO
import java.time.Instant

object CheckTestData {

    val check = Check(
        id = 1L,
        customer = CustomerTestData.customer,
        title = "Check One",
        language = Language.GERMAN,
        activeFrom = Instant.parse("2020-01-01T09:00:00Z"),
        activeTo = Instant.parse("2020-01-04T09:00:00Z"),
        questionCategories = emptyList()
    )

    val checkWithQuestionCategories = Check(
        id = 1L,
        customer = CustomerTestData.customer,
        language = Language.GERMAN,
        title = "Check One",
        activeFrom = Instant.parse("2020-01-01T09:00:00Z"),
        activeTo = Instant.parse("2020-01-04T09:00:00Z"),
        questionCategories = listOf(QuestionCategoryTestData.questionCategory)
    )

    val checkDTO = CheckDTO(
        id = 1L,
        customerId = 1L,
        language = LanguageDTO(
            language = "GERMAN",
            locale = "de-CH"
        ),
        title = "Check One",
        activeFrom = Instant.parse("2020-01-01T09:00:00Z"),
        activeTo = Instant.parse("2020-01-04T09:00:00Z"),
        questionCategories = emptyList()
    )

    val checkDTOWithQuestionCategories = CheckDTO(
        id = 1L,
        customerId = 1L,
        language = LanguageDTO(
            language = "GERMAN",
            locale = "de-CH"
        ),
        title = "Check One",
        activeFrom = Instant.parse("2020-01-01T09:00:00Z"),
        activeTo = Instant.parse("2020-01-04T09:00:00Z"),
        questionCategories = listOf(QuestionCategoryTestData.questionCategoryDTO)
    )
}

package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.Check
import ch.iact.iactcheck.domain.model.Language
import ch.iact.iactcheck.domain.model.common.Translations
import ch.iact.iactcheck.dto.CheckDTO
import ch.iact.iactcheck.dto.LanguageDTO
import java.time.Instant

object CheckTestData {

    val check = Check(
        id = 1L,
        customer = CustomerTestData.customer,
        title = Translations.fromMap(mapOf(Pair("de-CH", "Check One"))),
        requiredLanguages = setOf(Language.GERMAN),
        defaultLanguage = Language.GERMAN,
        activeFrom = Instant.parse("2020-01-01T09:00:00Z"),
        activeTo = Instant.parse("2020-01-04T09:00:00Z"),
        questionCategories = emptyList(),
        submissions = emptyList()
    )

    val checkWithQuestionCategories = Check(
        id = 1L,
        customer = CustomerTestData.customer,
        requiredLanguages = setOf(Language.GERMAN),
        title = Translations.fromMap(mapOf(Pair("de-CH", "Check One"))),
        defaultLanguage = Language.GERMAN,
        activeFrom = Instant.parse("2020-01-01T09:00:00Z"),
        activeTo = Instant.parse("2020-01-04T09:00:00Z"),
        questionCategories = listOf(QuestionCategoryTestData.questionCategory),
        submissions = emptyList()
    )

    val checkDTO = CheckDTO(
        id = 1L,
        customerId = 1L,
        requiredLanguages = setOf(
            LanguageDTO(
                language = "GERMAN",
                locale = "de-CH"
            )
        ),
        title = mapOf(Pair("de-CH", "Check One")),
        defaultLanguage = LanguageDTO(language = "GERMAN", locale = "de-CH"),
        activeFrom = Instant.parse("2020-01-01T09:00:00Z"),
        activeTo = Instant.parse("2020-01-04T09:00:00Z"),
        questionCategories = emptyList()
    )

    val checkDTOWithQuestionCategories = CheckDTO(
        id = 1L,
        customerId = 1L,
        requiredLanguages = setOf(
            LanguageDTO(
                language = "GERMAN",
                locale = "de-CH"
            )
        ),
        title = mapOf(Pair("de-CH", "Check One")),
        defaultLanguage = LanguageDTO(language = "GERMAN", locale = "de-CH"),
        activeFrom = Instant.parse("2020-01-01T09:00:00Z"),
        activeTo = Instant.parse("2020-01-04T09:00:00Z"),
        questionCategories = listOf(QuestionCategoryTestData.questionCategoryDTO)
    )
}

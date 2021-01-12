package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.Check
import ch.iact.iactcheck.dto.CheckDTO
import ch.iact.iactcheck.dto.LanguageDTO

object CheckConverter {

    fun convertCheckToDTO(check: Check): CheckDTO {
        return CheckDTO(
            id = check.id,
            customerId = check.customer.id,
            title = check.title,
            language = LanguageDTO(
                language = check.language.name,
                locale = check.language.locale
            ),
            activeFrom = check.activeFrom,
            activeTo = check.activeTo,
            questionCategories = check.questionCategories.map {
                QuestionCategoryConverter.convertQuestionCategoryToDTO(it)
            }.toList()
        )
    }
}

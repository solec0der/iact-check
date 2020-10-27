package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.domain.model.Check
import ch.showlab.showlabcheck.dto.CheckDTO

object CheckConverter {

    fun convertCheckToDTO(check: Check): CheckDTO {
        return CheckDTO(
                id = check.id,
                customerId = check.customer.id,
                title = check.title,
                activeFrom = check.activeFrom,
                activeTo = check.activeTo,
                questionCategories = check.questionCategories.map {
                    QuestionCategoryConverter.convertQuestionCategoryToDTO(it)
                }.toList()
        )
    }
}

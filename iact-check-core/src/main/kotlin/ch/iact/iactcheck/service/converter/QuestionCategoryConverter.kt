package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.QuestionCategory
import ch.iact.iactcheck.dto.QuestionCategoryDTO

object QuestionCategoryConverter {

    fun convertQuestionCategoryToDTO(questionCategory: QuestionCategory): QuestionCategoryDTO {
        return QuestionCategoryDTO(
            id = questionCategory.id,
            checkId = questionCategory.check.id,
            title = questionCategory.title,
            possibleOutcomes = questionCategory.possibleOutcomes.map {
                PossibleOutcomeConverter.convertPossibleOutcomeToDTO(it)
            }.toList(),
            rangeQuestions = questionCategory.rangeQuestions.map {
                RangeQuestionConverter.convertQuestionToDTO(it)
            }.toList()
        )
    }
}

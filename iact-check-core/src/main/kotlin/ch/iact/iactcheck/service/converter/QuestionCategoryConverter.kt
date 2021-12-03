package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.QuestionCategory
import ch.iact.iactcheck.dto.LanguageDTO
import ch.iact.iactcheck.dto.QuestionCategoryDTO

object QuestionCategoryConverter {

    fun convertQuestionCategoryToDTO(questionCategory: QuestionCategory): QuestionCategoryDTO {
        return QuestionCategoryDTO(
            id = questionCategory.id,
            checkId = questionCategory.check.id,
            title = questionCategory.title,
            language = LanguageDTO(questionCategory.language.name, questionCategory.language.locale),
            possibleOutcomes = questionCategory.possibleOutcomes.map {
                PossibleOutcomeConverter.convertPossibleOutcomeToDTO(it)
            }.toList(),
            rangeQuestions = questionCategory.rangeQuestions.map {
                RangeQuestionConverter.convertQuestionToDTO(it)
            }.toList(),
            imageQuestions = questionCategory.imageQuestions.mapTo(mutableListOf(), ImageQuestionConverter::map)
        )
    }
}

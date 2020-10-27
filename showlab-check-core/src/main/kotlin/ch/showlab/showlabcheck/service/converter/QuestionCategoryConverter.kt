package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.domain.model.QuestionCategory
import ch.showlab.showlabcheck.dto.QuestionCategoryDTO

object QuestionCategoryConverter {

    fun convertQuestionCategoryToDTO(questionCategory: QuestionCategory): QuestionCategoryDTO {
        return QuestionCategoryDTO(
                id = questionCategory.id,
                checkId = questionCategory.id,
                title = questionCategory.title,
                possibleOutcomes = questionCategory.possibleOutComes.map {
                    PossibleOutcomeConverter.convertPossibleOutcomeToDTO(it)
                }.toList(),
                questions = questionCategory.questions.map {
                    QuestionConverter.convertQuestionToDTO(it)
                }.toList()
        )
    }
}

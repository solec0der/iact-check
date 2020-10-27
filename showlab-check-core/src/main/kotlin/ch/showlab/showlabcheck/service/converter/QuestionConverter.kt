package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.domain.model.Question
import ch.showlab.showlabcheck.dto.QuestionDTO

object QuestionConverter {

    fun convertQuestionToDTO(question: Question): QuestionDTO {
        return QuestionDTO(
                id = question.id,
                questionCategoryId = question.questionCategory.id,
                questionText = question.questionText,
                minScore = question.minScore,
                maxScore = question.maxScore
        )
    }
}

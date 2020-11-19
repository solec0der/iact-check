package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.Question
import ch.iact.iactcheck.dto.QuestionDTO

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

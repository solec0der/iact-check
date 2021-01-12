package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.RangeQuestion
import ch.iact.iactcheck.dto.RangeQuestionDTO
import ch.iact.iactcheck.dto.RangeStepDTO

object RangeQuestionConverter {

    fun convertQuestionToDTO(rangeQuestion: RangeQuestion): RangeQuestionDTO {
        return RangeQuestionDTO(
            id = rangeQuestion.id,
            questionCategoryId = rangeQuestion.questionCategory.id,
            questionText = rangeQuestion.questionText,
            rangeSteps = rangeQuestion.rangeSteps.map {
                RangeStepDTO(
                    id = it.id,
                    rangeQuestionId = it.rangeQuestion.id,
                    score = it.score,
                    description = it.description
                )
            }.toList()
        )
    }
}

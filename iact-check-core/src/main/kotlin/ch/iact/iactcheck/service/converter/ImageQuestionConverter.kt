package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.ImageAnswer
import ch.iact.iactcheck.domain.model.ImageQuestion
import ch.iact.iactcheck.dto.ImageAnswerDTO
import ch.iact.iactcheck.dto.ImageQuestionDTO

object ImageQuestionConverter {

    fun map(imageQuestion: ImageQuestion): ImageQuestionDTO {
        return ImageQuestionDTO(
            id = imageQuestion.id,
            questionCategoryId = imageQuestion.questionCategory.id,
            questionText = imageQuestion.questionText,
            imageAnswers = imageQuestion.imageAnswers.mapTo(mutableListOf(), ImageQuestionConverter::map)
        )
    }

    fun map(imageAnswer: ImageAnswer): ImageAnswerDTO {
        return ImageAnswerDTO(
            id = imageAnswer.id,
            imageQuestionId = imageAnswer.imageQuestion.id,
            score = imageAnswer.score
        )
    }
}

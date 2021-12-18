package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.FlashCardAnswer
import ch.iact.iactcheck.domain.model.FlashCardQuestion
import ch.iact.iactcheck.dto.FlashCardAnswerDTO
import ch.iact.iactcheck.dto.FlashCardQuestionDTO

object FlashCardConverter {

    fun convertFlashCardQuestionToDTO(flashCardQuestion: FlashCardQuestion): FlashCardQuestionDTO {
        return FlashCardQuestionDTO(
            id = flashCardQuestion.id,
            checkId = flashCardQuestion.check.id,
            question = flashCardQuestion.question,
            allowMultipleAnswers = flashCardQuestion.allowMultipleAnswers,
            answers = flashCardQuestion.answers.map(this::convertFlashCardAnswerToDTO).toList()
        )
    }

    private fun convertFlashCardAnswerToDTO(flashCardAnswer: FlashCardAnswer): FlashCardAnswerDTO {
        return FlashCardAnswerDTO(flashCardAnswer.answer, flashCardAnswer.isCorrectAnswer)
    }
}

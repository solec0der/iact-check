package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.CheckNotFoundException
import ch.iact.iactcheck.controller.exception.FlashCardQuestionNotFoundException
import ch.iact.iactcheck.domain.model.FlashCardAnswer
import ch.iact.iactcheck.domain.model.FlashCardQuestion
import ch.iact.iactcheck.domain.repository.CheckRepository
import ch.iact.iactcheck.domain.repository.FlashCardQuestionRepository
import ch.iact.iactcheck.dto.FlashCardQuestionDTO
import ch.iact.iactcheck.service.converter.FlashCardConverter
import org.springframework.stereotype.Service

@Service
class FlashCardService(
    private val flashCardQuestionRepository: FlashCardQuestionRepository,
    private val checkRepository: CheckRepository
) {

    fun createFlashCardQuestion(flashCardQuestionDTO: FlashCardQuestionDTO): FlashCardQuestionDTO {
        val check = checkRepository
            .findById(flashCardQuestionDTO.checkId)
            .orElseThrow { throw CheckNotFoundException() }

        var flashCardQuestion = FlashCardQuestion(
            id = -1,
            question = flashCardQuestionDTO.question,
            allowMultipleAnswers = flashCardQuestionDTO.allowMultipleAnswers,
            requiredQuestion = flashCardQuestionDTO.requiredQuestion,
            check = check,
            answers = ArrayList()
        )
        flashCardQuestion = flashCardQuestionRepository.save(flashCardQuestion)
        flashCardQuestion = flashCardQuestion.copy(answers = flashCardQuestionDTO.answers.map {
            FlashCardAnswer(
                id = -1,
                answer = it.answer,
                isCorrectAnswer = it.correctAnswer,
                flashCardQuestion = flashCardQuestion
            )
        })

        return FlashCardConverter.convertFlashCardQuestionToDTO(flashCardQuestionRepository.save(flashCardQuestion))
    }

    fun getFlashCardsByCheckId(checkId: Long): List<FlashCardQuestionDTO> {
        return flashCardQuestionRepository
            .findByCheckId(checkId)
            .map(FlashCardConverter::convertFlashCardQuestionToDTO)
    }

    fun getFlashCardQuestionById(flashCardQuestionId: Long): FlashCardQuestionDTO {
        return FlashCardConverter.convertFlashCardQuestionToDTO(
            flashCardQuestionRepository
                .findById(flashCardQuestionId)
                .orElseThrow { throw FlashCardQuestionNotFoundException() }
        )
    }

    fun updateFlashCardQuestionById(
        flashCardQuestionId: Long,
        flashCardQuestionDTO: FlashCardQuestionDTO
    ): FlashCardQuestionDTO {
        var flashCardQuestion = flashCardQuestionRepository
            .findById(flashCardQuestionId)
            .orElseThrow { throw FlashCardQuestionNotFoundException() }

        flashCardQuestion = flashCardQuestion.copy(
            question = flashCardQuestionDTO.question,
            allowMultipleAnswers = flashCardQuestionDTO.allowMultipleAnswers,
            requiredQuestion = flashCardQuestionDTO.requiredQuestion,
            answers = flashCardQuestionDTO.answers.map {
                FlashCardAnswer(
                    id = -1,
                    answer = it.answer,
                    isCorrectAnswer = it.correctAnswer,
                    flashCardQuestion = flashCardQuestion
                )
            }
        )
        return FlashCardConverter.convertFlashCardQuestionToDTO(flashCardQuestionRepository.save(flashCardQuestion))
    }

    fun deleteFlashCardQuestionById(flashCardQuestionId: Long) {
        flashCardQuestionRepository.deleteById(flashCardQuestionId)
    }
}

package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.ImageAnswerNotFoundException
import ch.iact.iactcheck.controller.exception.ImageQuestionNotFoundException
import ch.iact.iactcheck.controller.exception.PossibleOutcomeNotFoundException
import ch.iact.iactcheck.controller.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.domain.model.ImageAnswer
import ch.iact.iactcheck.domain.model.ImageQuestion
import ch.iact.iactcheck.domain.repository.ImageAnswerRepository
import ch.iact.iactcheck.domain.repository.ImageQuestionRepository
import ch.iact.iactcheck.domain.repository.PossibleOutcomeRepository
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.dto.ImageQuestionDTO
import ch.iact.iactcheck.service.converter.ImageQuestionConverter
import org.springframework.stereotype.Service

@Service
class ImageQuestionService(
    private val questionCategoryRepository: QuestionCategoryRepository,
    private val imageQuestionRepository: ImageQuestionRepository,
    private val imageAnswerRepository: ImageAnswerRepository,
    private val possibleOutcomeRepository: PossibleOutcomeRepository
) {

    fun createImageQuestion(imageQuestionDTO: ImageQuestionDTO): ImageQuestionDTO {
        val questionCategory = questionCategoryRepository
            .findById(imageQuestionDTO.questionCategoryId)
            .orElseThrow { throw QuestionCategoryNotFoundException() }

        var imageQuestion = ImageQuestion(
            id = -1,
            questionText = imageQuestionDTO.questionText,
            imageAnswers = emptyList(),
            questionCategory = questionCategory
        )
        imageQuestion = imageQuestionRepository.save(imageQuestion)
        imageQuestion = imageQuestion.copy(
            imageAnswers = imageQuestionDTO.imageAnswers.map {
                ImageAnswer(
                    id = -1,
                    imageQuestion = imageQuestion,
                    possibleOutcome = possibleOutcomeRepository.findById(it.possibleOutcomeId)
                        .orElseThrow { throw PossibleOutcomeNotFoundException() }
                )
            }
        )

        return ImageQuestionConverter.map(imageQuestionRepository.save(imageQuestion))
    }

    fun getImageQuestionById(imageQuestionId: Long): ImageQuestionDTO {
        return ImageQuestionConverter.map(
            imageQuestionRepository.findById(imageQuestionId).orElseThrow { throw ImageQuestionNotFoundException() }
        )
    }

    fun getImageByImageAnswerId(imageAnswerId: Long): ByteArray {
        return imageAnswerRepository
            .findById(imageAnswerId)
            .orElseThrow { throw ImageAnswerNotFoundException() }
            .image
    }

    fun updateImageQuestionById(imageQuestionId: Long, imageQuestionDTO: ImageQuestionDTO): ImageQuestionDTO {
        var imageQuestion = imageQuestionRepository
            .findById(imageQuestionId)
            .orElseThrow { throw ImageQuestionNotFoundException() }

        imageQuestion = imageQuestion.copy(
            questionText = imageQuestionDTO.questionText,
            imageAnswers = imageQuestionDTO.imageAnswers.map {
                ImageAnswer(
                    id = it.id,
                    imageQuestion = imageQuestion,
                    possibleOutcome = possibleOutcomeRepository.findById(it.possibleOutcomeId)
                        .orElseThrow { throw PossibleOutcomeNotFoundException() },
                    image = imageQuestion.imageAnswers.find { imageAnswer -> imageAnswer.id == it.id }?.image
                        ?: ByteArray(0)
                )
            }
        )
        return ImageQuestionConverter.map(imageQuestionRepository.save(imageQuestion))
    }

    fun uploadImageForImageAnswer(imageAnswerId: Long, file: ByteArray) {
        val imageAnswer = imageAnswerRepository
            .findById(imageAnswerId)
            .orElseThrow { throw ImageAnswerNotFoundException() }
            .copy(image = file)

        imageAnswerRepository.save(imageAnswer)
    }

    fun deleteImageQuestionById(imageQuestionId: Long) {
        imageQuestionRepository.deleteById(imageQuestionId)
    }
}

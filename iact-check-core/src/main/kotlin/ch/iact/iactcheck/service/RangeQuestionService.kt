package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.model.RangeQuestion
import ch.iact.iactcheck.domain.model.RangeStep
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.domain.repository.RangeQuestionRepository
import ch.iact.iactcheck.dto.RangeQuestionDTO
import ch.iact.iactcheck.infrastructure.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.infrastructure.exception.QuestionNotFoundException
import ch.iact.iactcheck.service.converter.RangeQuestionConverter
import org.springframework.stereotype.Service

@Service
class RangeQuestionService(
        private val rangeQuestionRepository: RangeQuestionRepository,
        private val questionCategoryRepository: QuestionCategoryRepository
) {

    fun createRangeQuestion(rangeQuestionDTO: RangeQuestionDTO): RangeQuestionDTO {
        val questionCategory = questionCategoryRepository
                .findById(rangeQuestionDTO.questionCategoryId)
                .orElseThrow { throw QuestionCategoryNotFoundException() }

        var rangeQuestion = RangeQuestion(
                id = -1,
                questionText = rangeQuestionDTO.questionText,
                rangeSteps = emptyList(),
                questionCategory = questionCategory
        )
        rangeQuestion = rangeQuestionRepository.save(rangeQuestion);
        rangeQuestion = rangeQuestion.copy(
                rangeSteps = rangeQuestionDTO.rangeSteps.map {
                    RangeStep(id = -1, rangeQuestion = rangeQuestion, score = it.score, description = it.description)
                }
        )

        return RangeQuestionConverter.convertQuestionToDTO(rangeQuestionRepository.save(rangeQuestion))
    }

    fun updateQuestionById(questionId: Long, rangeQuestionDTO: RangeQuestionDTO): RangeQuestionDTO {
        var rangeQuestion = rangeQuestionRepository.findById(questionId).orElseThrow { throw QuestionNotFoundException() }

        rangeQuestion = rangeQuestion.copy(
                questionText = rangeQuestionDTO.questionText,
                rangeSteps = rangeQuestionDTO.rangeSteps.map {
                    RangeStep(id = -1, rangeQuestion = rangeQuestion, score = it.score, description = it.description)
                }
        )

        return RangeQuestionConverter.convertQuestionToDTO(rangeQuestionRepository.save(rangeQuestion))
    }

    fun uploadIconForQuestion(questionId: Long, icon: ByteArray) {
        var question = rangeQuestionRepository.findById(questionId).orElseThrow { throw QuestionNotFoundException() }

        question = question.copy(icon = icon)

        rangeQuestionRepository.save(question)
    }

    fun getIconByRangeQuestionId(questionId: Long): ByteArray {
        val question = rangeQuestionRepository.findById(questionId).orElseThrow { throw QuestionNotFoundException() }

        return question.icon
    }

    fun deleteQuestionById(questionId: Long) {
        rangeQuestionRepository.deleteById(questionId)
    }
}

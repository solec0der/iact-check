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

    fun getRangeQuestionById(rangeQuestionId: Long): RangeQuestionDTO {
        return RangeQuestionConverter.convertQuestionToDTO(
                rangeQuestionRepository.findById(rangeQuestionId).orElseThrow { throw QuestionNotFoundException() }
        )
    }

    fun updateRangeQuestionById(rangeQuestionId: Long, rangeQuestionDTO: RangeQuestionDTO): RangeQuestionDTO {
        var rangeQuestion = rangeQuestionRepository.findById(rangeQuestionId).orElseThrow { throw QuestionNotFoundException() }

        rangeQuestion = rangeQuestion.copy(
                questionText = rangeQuestionDTO.questionText,
                rangeSteps = rangeQuestionDTO.rangeSteps.map {
                    RangeStep(id = -1, rangeQuestion = rangeQuestion, score = it.score, description = it.description)
                }
        )

        return RangeQuestionConverter.convertQuestionToDTO(rangeQuestionRepository.save(rangeQuestion))
    }

    fun uploadIconForRangeQuestion(rangeQuestionId: Long, icon: ByteArray) {
        var rangeQuestion = rangeQuestionRepository.findById(rangeQuestionId).orElseThrow { throw QuestionNotFoundException() }

        rangeQuestion = rangeQuestion.copy(icon = icon)

        rangeQuestionRepository.save(rangeQuestion)
    }

    fun getIconByRangeQuestionId(questionId: Long): ByteArray {
        val rangeQuestion = rangeQuestionRepository.findById(questionId).orElseThrow { throw QuestionNotFoundException() }

        return rangeQuestion.icon
    }

    fun deleteRangeQuestionById(rangeQuestionId: Long) {
        rangeQuestionRepository.deleteById(rangeQuestionId)
    }
}

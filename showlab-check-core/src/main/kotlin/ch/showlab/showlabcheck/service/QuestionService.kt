package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.domain.model.Question
import ch.showlab.showlabcheck.domain.repository.QuestionCategoryRepository
import ch.showlab.showlabcheck.domain.repository.QuestionRepository
import ch.showlab.showlabcheck.dto.QuestionDTO
import ch.showlab.showlabcheck.infrastructure.exception.QuestionCategoryNotFoundException
import ch.showlab.showlabcheck.service.converter.QuestionConverter
import org.springframework.stereotype.Service

@Service
class QuestionService(
        private val questionRepository: QuestionRepository,
        private val questionCategoryRepository: QuestionCategoryRepository
) {

    fun createQuestion(questionDTO: QuestionDTO): QuestionDTO {
        val questionCategory = questionCategoryRepository
                .findById(questionDTO.questionCategoryId)
                .orElseThrow { throw QuestionCategoryNotFoundException() }

        val question = Question(
                id = -1,
                questionText = questionDTO.questionText,
                minScore =  questionDTO.minScore,
                maxScore = questionDTO.maxScore,
                questionCategory = questionCategory
        )

        return QuestionConverter.convertQuestionToDTO(questionRepository.save(question))
    }
}

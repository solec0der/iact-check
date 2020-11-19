package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.model.Question
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.domain.repository.QuestionRepository
import ch.iact.iactcheck.dto.QuestionDTO
import ch.iact.iactcheck.infrastructure.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.service.converter.QuestionConverter
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

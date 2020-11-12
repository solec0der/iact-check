package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.domain.model.QuestionCategory
import ch.showlab.showlabcheck.domain.repository.CheckRepository
import ch.showlab.showlabcheck.domain.repository.QuestionCategoryRepository
import ch.showlab.showlabcheck.dto.QuestionCategoryDTO
import ch.showlab.showlabcheck.infrastructure.exception.CheckNotFoundException
import ch.showlab.showlabcheck.infrastructure.exception.QuestionCategoryNotFoundException
import ch.showlab.showlabcheck.service.converter.QuestionCategoryConverter
import org.springframework.stereotype.Service

@Service
class QuestionCategoryService(
        private val checkRepository: CheckRepository,
        private val questionCategoryRepository: QuestionCategoryRepository
) {

    fun createQuestionCategory(questionCategoryDTO: QuestionCategoryDTO): QuestionCategoryDTO {
        val check = checkRepository.findById(questionCategoryDTO.checkId).orElseThrow { throw CheckNotFoundException() }

        val questionCategory = QuestionCategory(
                id = -1,
                check = check,
                title = questionCategoryDTO.title,
                questions = emptyList(),
                possibleOutComes = emptyList()
        )

        return QuestionCategoryConverter.convertQuestionCategoryToDTO(questionCategoryRepository.save(questionCategory))
    }

    fun uploadThumbnailForQuestionCategory(questionCategoryId: Long, thumbnail: ByteArray) {
        var questionCategory = questionCategoryRepository
                .findById(questionCategoryId)
                .orElseThrow { throw QuestionCategoryNotFoundException() }

        questionCategory = questionCategory.copy(
                thumbnail = thumbnail
        )

        questionCategoryRepository.save(questionCategory)
    }

    fun getThumbnailByQuestionCategoryId(questionCategoryId: Long): ByteArray {
        val questionCategory = questionCategoryRepository
                .findById(questionCategoryId)
                .orElseThrow { throw QuestionCategoryNotFoundException() }

        return questionCategory.thumbnail
    }

    fun updateQuestionCategoryById(questionCategoryId: Long, questionCategoryDTO: QuestionCategoryDTO): QuestionCategoryDTO {
        var questionCategory = questionCategoryRepository
                .findById(questionCategoryId)
                .orElseThrow { throw QuestionCategoryNotFoundException() }

        questionCategory = questionCategory.copy(title = questionCategory.title)

        return QuestionCategoryConverter.convertQuestionCategoryToDTO(questionCategoryRepository.save(questionCategory))
    }

    fun deleteQuestionCategoryById(questionCategoryId: Long) {
        questionCategoryRepository.deleteById(questionCategoryId)
    }
}

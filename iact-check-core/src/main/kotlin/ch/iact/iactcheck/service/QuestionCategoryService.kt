package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.CheckNotFoundException
import ch.iact.iactcheck.controller.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.domain.model.Language
import ch.iact.iactcheck.domain.model.QuestionCategory
import ch.iact.iactcheck.domain.repository.CheckRepository
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.dto.QuestionCategoryDTO
import ch.iact.iactcheck.service.converter.QuestionCategoryConverter
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
            language = Language.findLanguageByLocale(questionCategoryDTO.language.locale),
            rangeQuestions = emptyList(),
            possibleOutcomes = emptyList()
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

    fun getQuestionCategoryById(questionCategoryId: Long): QuestionCategoryDTO {
        return QuestionCategoryConverter.convertQuestionCategoryToDTO(
            questionCategoryRepository.findById(questionCategoryId)
                .orElseThrow { throw QuestionCategoryNotFoundException() }
        )
    }

    fun getThumbnailByQuestionCategoryId(questionCategoryId: Long): ByteArray {
        val questionCategory = questionCategoryRepository
            .findById(questionCategoryId)
            .orElseThrow { throw QuestionCategoryNotFoundException() }

        return questionCategory.thumbnail
    }

    fun updateQuestionCategoryById(
        questionCategoryId: Long,
        questionCategoryDTO: QuestionCategoryDTO
    ): QuestionCategoryDTO {
        var questionCategory = questionCategoryRepository
            .findById(questionCategoryId)
            .orElseThrow { throw QuestionCategoryNotFoundException() }

        questionCategory = questionCategory.copy(
            title = questionCategoryDTO.title,
            language = Language.findLanguageByLocale(questionCategoryDTO.language.locale)
        )

        return QuestionCategoryConverter.convertQuestionCategoryToDTO(questionCategoryRepository.save(questionCategory))
    }

    fun deleteQuestionCategoryById(questionCategoryId: Long) {
        questionCategoryRepository.deleteById(questionCategoryId)
    }
}

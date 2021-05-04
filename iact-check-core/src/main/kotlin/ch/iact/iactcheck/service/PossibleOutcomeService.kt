package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.PossibleOutcomeNotFoundException
import ch.iact.iactcheck.controller.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.domain.model.PossibleOutcome
import ch.iact.iactcheck.domain.model.PossibleScore
import ch.iact.iactcheck.domain.repository.PossibleOutcomeRepository
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.dto.PossibleOutcomeDTO
import ch.iact.iactcheck.service.converter.PossibleOutcomeConverter
import org.springframework.stereotype.Service

@Service
class PossibleOutcomeService(
    private val possibleOutcomeRepository: PossibleOutcomeRepository,
    private val questionCategoryRepository: QuestionCategoryRepository
) {

    fun createPossibleOutcome(possibleOutcomeDTO: PossibleOutcomeDTO): PossibleOutcomeDTO {
        val questionCategory = questionCategoryRepository
            .findById(possibleOutcomeDTO.questionCategoryId)
            .orElseThrow { throw QuestionCategoryNotFoundException() }

        var possibleOutcome = PossibleOutcome(
            id = -1,
            title = possibleOutcomeDTO.title,
            subtitle = possibleOutcomeDTO.subtitle,
            description = possibleOutcomeDTO.description,
            youtubeUrl = possibleOutcomeDTO.youtubeUrl,
            questionCategory = questionCategory
        )

        possibleOutcome = possibleOutcomeRepository.save(possibleOutcome)
        possibleOutcome = possibleOutcome.copy(
            possibleScores = possibleOutcomeDTO.possibleScores.map {
                PossibleScore(id = -1, possibleOutcome = possibleOutcome, score = it.score)
            }
        )

        return PossibleOutcomeConverter.convertPossibleOutcomeToDTO(possibleOutcomeRepository.save(possibleOutcome))
    }

    fun getPossibleOutcomeById(possibleOutcomeId: Long): PossibleOutcomeDTO {
        return PossibleOutcomeConverter.convertPossibleOutcomeToDTO(
            possibleOutcomeRepository.findById(possibleOutcomeId).orElseThrow { PossibleOutcomeNotFoundException() }
        )
    }

    fun getPossibleOutcomesByScoreAndQuestionCategoryId(
        score: Int,
        questionCategoryId: Long
    ): List<PossibleOutcomeDTO> {
        val possibleOutcomes = possibleOutcomeRepository.findAllByQuestionCategoryId(questionCategoryId)

        return possibleOutcomes
            .sortedByDescending { it.possibleScores.any { possibleScore -> possibleScore.score == score } }
            .map { PossibleOutcomeConverter.convertPossibleOutcomeToDTO(it) }
            .toList()
    }

    fun getThumbnailByPossibleOutcomeId(possibleOutcomeId: Long): ByteArray {
        val possibleOutcome = possibleOutcomeRepository
            .findById(possibleOutcomeId)
            .orElseThrow { throw PossibleOutcomeNotFoundException() }

        return possibleOutcome.thumbnail ?: ByteArray(0)
    }

    fun getPdfByPossibleOutcomeId(possibleOutcomeId: Long): ByteArray {
        val possibleOutcome = possibleOutcomeRepository
            .findById(possibleOutcomeId)
            .orElseThrow { throw PossibleOutcomeNotFoundException() }

        return possibleOutcome.pdf ?: ByteArray(0)
    }

    fun uploadAdditionalAssetsForPossibleOutcome(possibleOutcomeId: Long, thumbnail: ByteArray, pdf: ByteArray) {
        var possibleOutcome = possibleOutcomeRepository
            .findById(possibleOutcomeId)
            .orElseThrow { throw PossibleOutcomeNotFoundException() }

        possibleOutcome = possibleOutcome.copy(thumbnail = thumbnail)
        possibleOutcomeRepository.save(possibleOutcome)
        possibleOutcome = possibleOutcome.copy(pdf = pdf)
        possibleOutcomeRepository.save(possibleOutcome)
    }

    fun updatePossibleOutcomeById(possibleOutcomeId: Long, possibleOutcomeDTO: PossibleOutcomeDTO): PossibleOutcomeDTO {
        var possibleOutcome = possibleOutcomeRepository
            .findById(possibleOutcomeId)
            .orElseThrow { throw PossibleOutcomeNotFoundException() }

        possibleOutcome = possibleOutcome.copy(
            title = possibleOutcomeDTO.title,
            subtitle = possibleOutcomeDTO.subtitle,
            description = possibleOutcomeDTO.description,
            youtubeUrl = possibleOutcomeDTO.youtubeUrl,
            possibleScores = possibleOutcomeDTO.possibleScores.map {
                PossibleScore(id = -1, possibleOutcome = possibleOutcome, score = it.score)
            }
        )

        return PossibleOutcomeConverter.convertPossibleOutcomeToDTO(possibleOutcomeRepository.save(possibleOutcome))
    }

    fun deletePossibleOutcomeById(possibleOutcomeId: Long) {
        possibleOutcomeRepository.deleteById(possibleOutcomeId)
    }
}

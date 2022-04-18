package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.PossibleOutcomeNotFoundException
import ch.iact.iactcheck.controller.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.controller.exception.SubmissionNotFoundException
import ch.iact.iactcheck.domain.model.*
import ch.iact.iactcheck.domain.repository.PossibleOutcomeRepository
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.domain.repository.SubmissionRepository
import ch.iact.iactcheck.dto.PossibleOutcomeDTO
import ch.iact.iactcheck.dto.QuestionCategoryDTO
import ch.iact.iactcheck.service.converter.PossibleOutcomeConverter
import org.springframework.stereotype.Service
import java.util.*
import kotlin.math.min

@Service
class PossibleOutcomeService(
    private val possibleOutcomeRepository: PossibleOutcomeRepository,
    private val questionCategoryRepository: QuestionCategoryRepository,
    private val submissionRepository: SubmissionRepository,
    private val questionCategoryService: QuestionCategoryService
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
            backgroundColour = possibleOutcomeDTO.backgroundColour,
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

    fun getPossibleOutcomesBySubmissionIdAndQuestionCategoryId(
        submissionId: Long,
        questionCategoryId: Long
    ): List<PossibleOutcomeDTO> {
        // TODO: Add handling for rangeQuestions
        val submission = submissionRepository.findById(submissionId).orElseThrow { throw SubmissionNotFoundException() }
        val questionCategory = questionCategoryService.getQuestionCategoryById(questionCategoryId)

        if (submission.imageQuestionAnswers.isNotEmpty()) {
            return getPossibleOutcomesByImageQuestionAnswers(
                submission.imageQuestionAnswers,
                questionCategory.numberOfPossibleOutcomesToShow
            )
        }
        if (submission.rangeQuestionAnswers.isNotEmpty()) {
            return getPossibleOutcomesByRangeQuestionAnswers(submission.rangeQuestionAnswers, questionCategory)
        }
        return emptyList()
    }

    private fun getPossibleOutcomesByImageQuestionAnswers(
        imageQuestionAnswers: List<ImageQuestionAnswer>,
        numberOfPossibleOutcomesToShow: Int
    ): List<PossibleOutcomeDTO> {
        val scoreByPossibleOutcome = ArrayList<Pair<Long, Int>>()

        imageQuestionAnswers.forEach {
            val possibleOutcomeId = it.imageAnswer.possibleOutcome.id
            var previousScoreIndex = scoreByPossibleOutcome.indexOfFirst { pair -> pair.first == possibleOutcomeId }

            if (previousScoreIndex == -1) {
                scoreByPossibleOutcome.add(Pair(possibleOutcomeId, 0))
                previousScoreIndex = scoreByPossibleOutcome.size - 1;
            }

            val previousScore = scoreByPossibleOutcome[previousScoreIndex]
            scoreByPossibleOutcome[previousScoreIndex] = previousScore.copy(second = previousScore.second + 1)
        }

        val sortedScoresByPossibleOutcome = scoreByPossibleOutcome
            .sortedByDescending { pair -> pair.second }
            .take(numberOfPossibleOutcomesToShow)


        val possibleOutcomeIds = sortedScoresByPossibleOutcome.map(Pair<Long, Int>::first)

        val possibleOutcomes = ArrayList<PossibleOutcome>()

        possibleOutcomeIds.forEach {
            possibleOutcomes.add(
                possibleOutcomeRepository.findById(it).orElseThrow { throw PossibleOutcomeNotFoundException() })
        }

        return possibleOutcomes
            .map(PossibleOutcomeConverter::convertPossibleOutcomeToDTO)
            .toList()
    }

    private fun getPossibleOutcomesByRangeQuestionAnswers(
        rangeQuestionAnswers: List<RangeQuestionAnswer>,
        questionCategory: QuestionCategoryDTO
    ): List<PossibleOutcomeDTO> {
        val score = rangeQuestionAnswers.sumOf(RangeQuestionAnswer::value)

        val filteredPossibleOutcomes = questionCategory.possibleOutcomes.filter {
            it.possibleScores.any { possibleScore -> possibleScore.score == score }
        }.toMutableList()

        if (filteredPossibleOutcomes.size < questionCategory.numberOfPossibleOutcomesToShow) {
            val possibleOutcomesNotInScore = questionCategory.possibleOutcomes.filter {
                it.possibleScores.all { possibleScore -> possibleScore.score != score }
            }

            val remainingPossibleOutcomes = min(
                questionCategory.numberOfPossibleOutcomesToShow - filteredPossibleOutcomes.size,
                possibleOutcomesNotInScore.size
            )

            filteredPossibleOutcomes.addAll(
                possibleOutcomesNotInScore.take(remainingPossibleOutcomes)
            )
        }
        return filteredPossibleOutcomes
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
            backgroundColour = possibleOutcomeDTO.backgroundColour,
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

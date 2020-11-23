package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.model.PossibleOutcome
import ch.iact.iactcheck.domain.model.PossibleScore
import ch.iact.iactcheck.domain.repository.PossibleOutcomeRepository
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.dto.PossibleOutcomeDTO
import ch.iact.iactcheck.dto.PossibleScoreDTO
import ch.iact.iactcheck.infrastructure.exception.PossibleOutcomeNotFoundException
import ch.iact.iactcheck.infrastructure.exception.QuestionCategoryNotFoundException
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

        val possibleOutcome = PossibleOutcome(
                id = -1,
                title = possibleOutcomeDTO.title,
                subtitle = possibleOutcomeDTO.subtitle,
                description = possibleOutcomeDTO.description,
                questionCategory = questionCategory,
                possibleScores = possibleOutcomeDTO.possibleScores.map {
                    PossibleScore(id = -1, score = it.score)
                }
        )

        return PossibleOutcomeConverter.convertPossibleOutcomeToDTO(possibleOutcomeRepository.save(possibleOutcome))
    }

    fun updatePossibleOutcomeById(possibleOutcomeId: Long, possibleOutcomeDTO: PossibleOutcomeDTO): PossibleOutcomeDTO {
        var possibleOutcome = possibleOutcomeRepository
                .findById(possibleOutcomeId)
                .orElseThrow { throw PossibleOutcomeNotFoundException() }

        possibleOutcome = possibleOutcome.copy(
                title = possibleOutcomeDTO.title,
                subtitle = possibleOutcomeDTO.subtitle,
                description = possibleOutcomeDTO.description,
                possibleScores = possibleOutcomeDTO.possibleScores.map {
                    PossibleScore(-1, score = it.score)
                }
        )

        return PossibleOutcomeConverter.convertPossibleOutcomeToDTO(possibleOutcomeRepository.save(possibleOutcome))
    }
}
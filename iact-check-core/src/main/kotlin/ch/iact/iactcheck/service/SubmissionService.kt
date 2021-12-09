package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.*
import ch.iact.iactcheck.domain.model.*
import ch.iact.iactcheck.domain.repository.*
import ch.iact.iactcheck.dto.*
import ch.iact.iactcheck.service.converter.SubmissionConverter
import ch.iact.iactcheck.util.PhoneNumberUtil
import org.apache.commons.validator.routines.EmailValidator
import org.springframework.stereotype.Service
import java.util.*

@Service
class SubmissionService(
    private val checkRepository: CheckRepository,
    private val submissionRepository: SubmissionRepository,
    private val rangeQuestionRepository: RangeQuestionRepository,
    private val imageAnswerRepository: ImageAnswerRepository,
    private val possibleOutcomeRepository: PossibleOutcomeRepository
) {

    fun createSubmission(submissionDTO: SubmissionDTO): SubmissionDTO {
        val check = checkRepository
            .findById(submissionDTO.correlatingCheckId)
            .orElseThrow { throw CheckNotFoundException() }

        val activeUserRegistrationFields = check.customer.activeUserRegistrationFields

        validateSubmission(submissionDTO, activeUserRegistrationFields)

        val submission = Submission(
            id = -1,
            check = check,
            firstName = submissionDTO.firstName,
            lastName = submissionDTO.lastName,
            street = submissionDTO.street,
            zipCode = submissionDTO.zipCode,
            city = submissionDTO.city,
            phoneNumber = submissionDTO.phoneNumber.trim(),
            email = submissionDTO.email.trim().lowercase(Locale.getDefault())
        )

        return SubmissionConverter.convertSubmissionToDTO(submissionRepository.save(submission))
    }

    fun addRangeQuestionAnswersToSubmission(
        submissionId: Long,
        rangeQuestionAnswers: List<RangeQuestionAnswerDTO>
    ): SubmissionDTO {
        var submission = submissionRepository
            .findById(submissionId)
            .orElseThrow { throw SubmissionNotFoundException() }

        val convertedRangeQuestionAnswers = rangeQuestionAnswers.map {
            RangeQuestionAnswer(
                id = -1,
                rangeQuestion = rangeQuestionRepository
                    .findById(it.rangeQuestionId)
                    .orElseThrow { throw RangeQuestionNotFoundException() },
                submission = submission,
                value = it.value
            )
        }.toList()

        submission = submission.copy(
            rangeQuestionAnswers = convertedRangeQuestionAnswers
        )

        return SubmissionConverter.convertSubmissionToDTO(submissionRepository.save(submission))
    }

    fun addImageQuestionAnswersToSubmission(
        submissionId: Long,
        imageQuestionAnswers: List<ImageQuestionAnswerDTO>
    ): SubmissionDTO {
        var submission = submissionRepository
            .findById(submissionId)
            .orElseThrow { throw SubmissionNotFoundException() }

        val convertedImageQuestionAnswers = imageQuestionAnswers.map {
            ImageQuestionAnswer(
                id = -1,
                imageAnswer = imageAnswerRepository.findById(it.imageAnswerId)
                    .orElseThrow { throw ImageAnswerNotFoundException() },
                submission = submission,
                value = it.value
            )
        }

        submission = submission.copy(
            imageQuestionAnswers = convertedImageQuestionAnswers
        )

        return SubmissionConverter.convertSubmissionToDTO(submissionRepository.save(submission))
    }

    fun addBookmarkedPossibleOutcomesToSubmission(
        submissionId: Long,
        bookmarkedPossibleOutcomes: List<BookmarkedPossibleOutcomeDTO>
    ): SubmissionDTO {
        var submission = submissionRepository
            .findById(submissionId)
            .orElseThrow { throw SubmissionNotFoundException() }

        val convertedBookmarkedPossibleOutcomes = bookmarkedPossibleOutcomes.map {
            BookmarkedPossibleOutcome(
                id = -1,
                possibleOutcome = possibleOutcomeRepository
                    .findById(it.possibleOutcomeId)
                    .orElseThrow { throw PossibleOutcomeNotFoundException() },
                submission = submission
            )
        }

        submission = submission.copy(
            bookmarkedPossibleOutcomes = convertedBookmarkedPossibleOutcomes
        )

        return SubmissionConverter.convertSubmissionToDTO(submissionRepository.save(submission))
    }

    fun getScoresGroupedByQuestionCategoryId(submissionId: Long): List<ScoreDTO> {
        val submission = submissionRepository
            .findById(submissionId)
            .orElseThrow { throw SubmissionNotFoundException() }

        val scoresByQuestionCategory = HashMap<Long, Int>()

        submission.imageQuestionAnswers.forEach {
            val questionCategoryId = it.imageAnswer.imageQuestion.questionCategory.id

            if (!scoresByQuestionCategory.containsKey(questionCategoryId)) {
                scoresByQuestionCategory[questionCategoryId] = 0;
            }
            val previousValue = scoresByQuestionCategory[questionCategoryId]
            scoresByQuestionCategory[questionCategoryId] = previousValue!! + it.imageAnswer.score
        }

        submission.rangeQuestionAnswers.forEach {
            val questionCategoryId = it.rangeQuestion.questionCategory.id

            if (!scoresByQuestionCategory.containsKey(questionCategoryId)) {
                scoresByQuestionCategory[questionCategoryId] = 0;
            }
            val previousValue = scoresByQuestionCategory[questionCategoryId]
            scoresByQuestionCategory[questionCategoryId] = previousValue!! + it.value
        }

        return scoresByQuestionCategory.map { ScoreDTO(it.key, it.value) }
    }

    private fun validateSubmission(
        submissionDTO: SubmissionDTO,
        activeUserRegistrationFields: Set<ActiveUserRegistrationField>
    ) {
        val normalizedPhoneNumber = submissionDTO.phoneNumber.trim()
        val normalizedEmail = submissionDTO.email.trim().toLowerCase()

        if (isUserRegistrationFieldActive("EMAIL", activeUserRegistrationFields)) {
            if (!EmailValidator.getInstance().isValid(normalizedEmail)) throw InvalidEmailException()
            if (submissionRepository.existsByEmail(normalizedEmail)) throw SubmissionAlreadyExistsException()
        }

        if (isUserRegistrationFieldActive("PHONE_NUMBER", activeUserRegistrationFields)) {
            if (!PhoneNumberUtil.isValidPhoneNumber(normalizedPhoneNumber)) throw InvalidPhoneNumberException()
            if (submissionRepository.existsByPhoneNumber(normalizedPhoneNumber)) throw SubmissionAlreadyExistsException()
        }
    }

    private fun isUserRegistrationFieldActive(
        userRegistrationField: String,
        activeUserRegistrationFields: Set<ActiveUserRegistrationField>
    ): Boolean {
        return activeUserRegistrationFields.any { it.userRegistrationField.fieldName == userRegistrationField }
    }
}

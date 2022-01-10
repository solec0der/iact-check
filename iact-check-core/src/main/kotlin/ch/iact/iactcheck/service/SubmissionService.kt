package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.*
import ch.iact.iactcheck.domain.model.*
import ch.iact.iactcheck.domain.repository.*
import ch.iact.iactcheck.dto.*
import ch.iact.iactcheck.messaging.Message
import ch.iact.iactcheck.messaging.email.EmailMessageService
import ch.iact.iactcheck.messaging.email.EmailRecipient
import ch.iact.iactcheck.service.converter.EmailSettingsConverter
import ch.iact.iactcheck.service.converter.SubmissionConverter
import ch.iact.iactcheck.util.PhoneNumberUtil
import org.apache.commons.validator.routines.EmailValidator
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*

@Service
class SubmissionService(
    private val checkRepository: CheckRepository,
    private val submissionRepository: SubmissionRepository,
    private val rangeQuestionRepository: RangeQuestionRepository,
    private val imageAnswerRepository: ImageAnswerRepository,
    private val possibleOutcomeRepository: PossibleOutcomeRepository,
    private val documentRepository: DocumentRepository,
    private val emailMessageService: EmailMessageService,
    @Value("\${coreUrl}") private val coreUrl: String
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
                submission = submission
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

    fun addBookmarkedDocumentsToSubmission(
        submissionId: Long,
        bookmarkedDocuments: List<BookmarkedDocumentDTO>
    ): SubmissionDTO {
        var submission = submissionRepository
            .findById(submissionId)
            .orElseThrow { throw SubmissionNotFoundException() }

        val convertedBookmarkedDocuments = bookmarkedDocuments.map {
            BookmarkedDocument(
                id = -1,
                document = documentRepository
                    .findById(it.documentId)
                    .orElseThrow { throw DocumentNotFoundException() },
                submission = submission
            )
        }

        submission = submission.copy(
            bookmarkedDocuments = convertedBookmarkedDocuments
        )

        return SubmissionConverter.convertSubmissionToDTO(submissionRepository.save(submission))
    }

    fun getScoresGroupedByQuestionCategoryId(submissionId: Long): List<ScoreDTO> {
        val submission = submissionRepository
            .findById(submissionId)
            .orElseThrow { throw SubmissionNotFoundException() }

        val scoresByQuestionCategory = HashMap<Long, Int>()

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

    fun requestBookmarkedItemsBySubmissionId(submissionId: Long) {
        val submission = submissionRepository
            .findById(submissionId)
            .orElseThrow { throw SubmissionNotFoundException() }

        val customer = submission.check.customer

        val subject = "Vielen Dank für deine Teilnahme!"
        var body =
            "Hey ${submission.firstName},<br><br> vielen Dank, dass du am Orientierungstag teilgenommen hast. <br><br>" +
                    "Anbei findest du Links zu den Dokumenten, die du dir während dem Orientierungstag auf dem iPad gemerkt hast. <br><br>"

        submission.bookmarkedDocuments.forEach {
            body += "${it.document.title} (${getLinkToDocument(it.document.id)})<br>"
        }

        val message = Message(subject, body)

        print(message)

        if (customer.emailSettings != null) {
            val emailSettings = EmailSettingsConverter.convertEmailSettingsToBusinessObject(customer.emailSettings!!)
            val emailRecipient = EmailRecipient(
                firstName = submission.firstName,
                lastName = submission.lastName,
                emailAddress = submission.email
            )
            emailMessageService.sendMessage(emailSettings, emailRecipient, message)
        }
    }

    fun deleteSubmissionById(submissionId: Long) {
        submissionRepository.deleteById(submissionId)
    }

    private fun getLinkToDocument(documentId: Long): String {
        return "${coreUrl}/api/documents/${documentId}/file"
    }

    private fun validateSubmission(
        submissionDTO: SubmissionDTO,
        activeUserRegistrationFields: Set<ActiveUserRegistrationField>
    ) {
        // TODO: Rework validation (make it more dynamic)
        val normalizedPhoneNumber = submissionDTO.phoneNumber.trim()
        val normalizedEmail = submissionDTO.email.trim().toLowerCase()

        if (isUserRegistrationFieldActive("EMAIL", activeUserRegistrationFields)) {
            val emailField = activeUserRegistrationFields.find { it.userRegistrationField.fieldName === "EMAIL" }
            if (emailField != null) {
                if (normalizedEmail.isEmpty() && emailField.required) {
                    throw InvalidEmailException();
                } else if (normalizedEmail.isNotEmpty() && !EmailValidator.getInstance().isValid(normalizedEmail)) {
                    throw InvalidEmailException()
                }
            }

        }

        if (isUserRegistrationFieldActive("PHONE_NUMBER", activeUserRegistrationFields)) {
            if (!PhoneNumberUtil.isValidPhoneNumber(normalizedPhoneNumber)) throw InvalidPhoneNumberException()
        }
    }

    private fun isUserRegistrationFieldActive(
        userRegistrationField: String,
        activeUserRegistrationFields: Set<ActiveUserRegistrationField>
    ): Boolean {
        return activeUserRegistrationFields.any { it.userRegistrationField.fieldName == userRegistrationField }
    }
}

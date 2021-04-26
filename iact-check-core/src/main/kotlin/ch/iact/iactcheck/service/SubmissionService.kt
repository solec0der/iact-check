package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.CheckNotFoundException
import ch.iact.iactcheck.controller.exception.InvalidEmailException
import ch.iact.iactcheck.controller.exception.InvalidPhoneNumberException
import ch.iact.iactcheck.controller.exception.SubmissionAlreadyExistsException
import ch.iact.iactcheck.domain.model.ActiveUserRegistrationField
import ch.iact.iactcheck.domain.model.Submission
import ch.iact.iactcheck.domain.repository.CheckRepository
import ch.iact.iactcheck.domain.repository.SubmissionRepository
import ch.iact.iactcheck.dto.SubmissionDTO
import ch.iact.iactcheck.service.converter.SubmissionConverter
import ch.iact.iactcheck.util.PhoneNumberUtil
import org.apache.commons.validator.routines.EmailValidator
import org.springframework.stereotype.Service

@Service
class SubmissionService(
    private val checkRepository: CheckRepository,
    private val submissionRepository: SubmissionRepository
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
            email = submissionDTO.email.trim().toLowerCase()
        )

        return SubmissionConverter.convertSubmissionToDTO(
            submissionRepository.save(submission)
        )
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

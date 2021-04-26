package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.Submission
import ch.iact.iactcheck.dto.SubmissionDTO

object SubmissionConverter {

    fun convertSubmissionToDTO(submission: Submission): SubmissionDTO {
        return SubmissionDTO(
            id = submission.id,
            correlatingCheckId = submission.check.id,
            firstName = submission.firstName,
            lastName = submission.lastName,
            street = submission.street,
            zipCode = submission.zipCode,
            city = submission.city,
            phoneNumber = submission.phoneNumber,
            email = submission.email,
            rangeQuestionAnswers = emptyList()
        )
    }
}

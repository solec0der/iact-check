package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.RangeQuestionAnswer
import ch.iact.iactcheck.domain.model.Submission
import ch.iact.iactcheck.dto.RangeQuestionAnswerDTO
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
            rangeQuestionAnswers = submission.rangeQuestionAnswers.map { convertRangeQuestionAnswerToDTO(it) }
        )
    }

    private fun convertRangeQuestionAnswerToDTO(rangeQuestionAnswer: RangeQuestionAnswer): RangeQuestionAnswerDTO {
        return RangeQuestionAnswerDTO(
            id = rangeQuestionAnswer.id,
            value = rangeQuestionAnswer.value,
            rangeQuestionId = rangeQuestionAnswer.rangeQuestion.id,
            rangeQuestionCategoryId = rangeQuestionAnswer.rangeQuestion.questionCategory.id
        )
    }
}

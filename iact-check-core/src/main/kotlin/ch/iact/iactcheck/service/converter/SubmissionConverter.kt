package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.BookmarkedPossibleOutcome
import ch.iact.iactcheck.domain.model.ImageQuestionAnswer
import ch.iact.iactcheck.domain.model.RangeQuestionAnswer
import ch.iact.iactcheck.domain.model.Submission
import ch.iact.iactcheck.dto.BookmarkedPossibleOutcomeDTO
import ch.iact.iactcheck.dto.ImageQuestionAnswerDTO
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
            rangeQuestionAnswers = submission.rangeQuestionAnswers.map { convertRangeQuestionAnswerToDTO(it) },
            imageQuestionAnswers = submission.imageQuestionAnswers.map { convertImageQuestionAnswerToDTO(it) },
            bookmarkedPossibleOutcomes = submission.bookmarkedPossibleOutcomes.map {
                convertBookmarkedPossibleOutcomeToDTO(it)
            }
        )
    }

    private fun convertRangeQuestionAnswerToDTO(rangeQuestionAnswer: RangeQuestionAnswer): RangeQuestionAnswerDTO {
        return RangeQuestionAnswerDTO(
            id = rangeQuestionAnswer.id,
            value = rangeQuestionAnswer.value,
            rangeQuestionId = rangeQuestionAnswer.rangeQuestion.id,
            questionCategoryId = rangeQuestionAnswer.rangeQuestion.questionCategory.id
        )
    }

    private fun convertImageQuestionAnswerToDTO(imageQuestionAnswer: ImageQuestionAnswer): ImageQuestionAnswerDTO {
        return ImageQuestionAnswerDTO(
            id = imageQuestionAnswer.id,
            value = imageQuestionAnswer.value,
            imageQuestionId = imageQuestionAnswer.imageAnswer.imageQuestion.id,
            imageAnswerId = imageQuestionAnswer.imageAnswer.id,
            questionCategoryId = imageQuestionAnswer.imageAnswer.imageQuestion.questionCategory.id
        )
    }


    private fun convertBookmarkedPossibleOutcomeToDTO(
        bookmarkedPossibleOutcome: BookmarkedPossibleOutcome
    ): BookmarkedPossibleOutcomeDTO {
        return BookmarkedPossibleOutcomeDTO(
            id = bookmarkedPossibleOutcome.id,
            possibleOutcomeId = bookmarkedPossibleOutcome.possibleOutcome.id
        )
    }
}

package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.*
import ch.iact.iactcheck.dto.*

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
            rangeQuestionAnswers = submission.rangeQuestionAnswers.map(this::convertRangeQuestionAnswerToDTO),
            imageQuestionAnswers = submission.imageQuestionAnswers.map(this::convertImageQuestionAnswerToDTO),
            bookmarkedPossibleOutcomes = submission.bookmarkedPossibleOutcomes.map(this::convertBookmarkedPossibleOutcomeToDTO),
            bookmarkedDocuments = submission.bookmarkedDocuments.map(this::convertBookmarkedDocumentsToDTO)
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

    private fun convertBookmarkedDocumentsToDTO(
        bookmarkedDocuments: BookmarkedDocument
    ): BookmarkedDocumentDTO {
        return BookmarkedDocumentDTO(
            id = bookmarkedDocuments.id,
            documentId = bookmarkedDocuments.document.id
        )
    }
}

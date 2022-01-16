package ch.iact.iactcheck.controller

import ch.iact.iactcheck.dto.*
import ch.iact.iactcheck.service.SubmissionService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/submissions")
internal class SubmissionController(private val submissionService: SubmissionService) {

    @PostMapping
    fun createSubmission(@RequestBody submissionDTO: SubmissionDTO): SubmissionDTO {
        return submissionService.createSubmission(submissionDTO)
    }

    @PutMapping("/{submissionId}/range-question-answers")
    fun addRangeQuestionAnswersToSubmission(
        @PathVariable("submissionId") submissionId: Long,
        @RequestBody rangeQuestionAnswers: List<RangeQuestionAnswerDTO>
    ): SubmissionDTO {
        return submissionService.addRangeQuestionAnswersToSubmission(submissionId, rangeQuestionAnswers)
    }

    @PutMapping("/{submissionId}/image-question-answers")
    fun addImageQuestionAnswersToSubmission(
        @PathVariable("submissionId") submissionId: Long,
        @RequestBody imageQuestionAnswers: List<ImageQuestionAnswerDTO>
    ): SubmissionDTO {
        return submissionService.addImageQuestionAnswersToSubmission(submissionId, imageQuestionAnswers)
    }

    @PutMapping("/{submissionId}/bookmarked-possible-outcomes")
    fun addBookmarkedPossibleOutcomesToSubmission(
        @PathVariable("submissionId") submissionId: Long,
        @RequestBody bookmarkedPossibleOutcomes: List<BookmarkedPossibleOutcomeDTO>
    ): SubmissionDTO {
        return submissionService.addBookmarkedPossibleOutcomesToSubmission(submissionId, bookmarkedPossibleOutcomes)
    }

    @PutMapping("/{submissionId}/bookmarked-documents")
    fun addBookmarkedDocumentsToSubmission(
        @PathVariable("submissionId") submissionId: Long,
        @RequestBody bookmarkedDocuments: List<BookmarkedDocumentDTO>
    ): SubmissionDTO {
        return submissionService.addBookmarkedDocumentsToSubmission(submissionId, bookmarkedDocuments)
    }

    @GetMapping("/{submissionId}/scores")
    fun getScoresGroupedByQuestionCategoryId(@PathVariable("submissionId") submissionId: Long): List<ScoreDTO> {
        return submissionService.getScoresGroupedByQuestionCategoryId(submissionId)
    }

    @GetMapping("/{submissionId}/bookmarked-items")
    fun requestBookmarkedItemsBySubmissionId(@PathVariable("submissionId") submissionId: Long) {
        submissionService.requestBookmarkedItemsBySubmissionId(submissionId)
    }

    @PutMapping("/{submissionId}")
    fun updateSubmissionById(@PathVariable("submissionId") submissionId: Long, @RequestBody submission: SubmissionDTO): SubmissionDTO {
        return submissionService.updateSubmissionById(submissionId, submission)
    }

    @DeleteMapping("/{submissionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteSubmissionById(@PathVariable("submissionId") submissionId: Long) {
        submissionService.deleteSubmissionById(submissionId)
    }
}

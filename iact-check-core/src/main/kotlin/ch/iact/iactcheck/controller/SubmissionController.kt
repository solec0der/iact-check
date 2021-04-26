package ch.iact.iactcheck.controller

import ch.iact.iactcheck.dto.RangeQuestionAnswerDTO
import ch.iact.iactcheck.dto.SubmissionDTO
import ch.iact.iactcheck.service.SubmissionService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/submissions")
internal class SubmissionController(
    private val submissionService: SubmissionService
) {

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
}

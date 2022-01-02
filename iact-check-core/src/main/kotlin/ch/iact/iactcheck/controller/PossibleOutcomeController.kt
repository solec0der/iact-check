package ch.iact.iactcheck.controller

import ch.iact.iactcheck.dto.PossibleOutcomeDTO
import ch.iact.iactcheck.service.PossibleOutcomeService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
internal class PossibleOutcomeController(
    private val possibleOutcomeService: PossibleOutcomeService
) {

    @GetMapping("/possible-outcomes")
    fun getPossibleOutcomesByScoreAndQuestionCategoryId(
        @RequestParam("score") score: Int,
        @RequestParam("question-category-id") questionCategoryId: Long
    ): List<PossibleOutcomeDTO> {
        return possibleOutcomeService.getPossibleOutcomesByScoreAndQuestionCategoryId(score, questionCategoryId)
    }

    @GetMapping("/submissions/{submissionId}/possible-outcomes")
    fun getPossibleOutcomesBySubmissionIdAndQuestionCategoryId(
        @PathVariable("submissionId") submissionId: Long,
        @RequestParam("question-category-id") questionCategoryId: Long
    ): List<PossibleOutcomeDTO> {
        return possibleOutcomeService.getPossibleOutcomesBySubmissionIdAndQuestionCategoryId(submissionId, questionCategoryId)
    }

    @GetMapping("/possible-outcomes/{possibleOutcomeId}/thumbnail", produces = [MediaType.IMAGE_PNG_VALUE])
    fun getThumbnailByPossibleOutcomeId(@PathVariable("possibleOutcomeId") possibleOutcomeId: Long): ByteArray {
        return possibleOutcomeService.getThumbnailByPossibleOutcomeId(possibleOutcomeId)
    }

    @GetMapping("/possible-outcomes/{possibleOutcomeId}/pdf", produces = [MediaType.APPLICATION_PDF_VALUE])
    fun getPdfByPossibleOutcomeId(@PathVariable("possibleOutcomeId") possibleOutcomeId: Long): ByteArray {
        return possibleOutcomeService.getPdfByPossibleOutcomeId(possibleOutcomeId)
    }
}

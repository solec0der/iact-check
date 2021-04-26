package ch.iact.iactcheck.controller

import ch.iact.iactcheck.dto.PossibleOutcomeDTO
import ch.iact.iactcheck.service.PossibleOutcomeService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/possible-outcomes")
internal class PossibleOutcomeController(
    private val possibleOutcomeService: PossibleOutcomeService
) {

    @GetMapping
    fun getPossibleOutcomesByScoreAndQuestionCategoryId(
        @RequestParam("score") score: Int,
        @RequestParam("question-category-id") questionCategoryId: Long
    ): List<PossibleOutcomeDTO> {
        return possibleOutcomeService.getPossibleOutcomesByScoreAndQuestionCategoryId(score, questionCategoryId)
    }

    @GetMapping("/{possibleOutcomeId}/thumbnail", produces = [MediaType.IMAGE_PNG_VALUE])
    fun getThumbnailByPossibleOutcomeId(@PathVariable("possibleOutcomeId") possibleOutcomeId: Long): ByteArray {
        return possibleOutcomeService.getThumbnailByPossibleOutcomeId(possibleOutcomeId)
    }

    @GetMapping("/{possibleOutcomeId}/pdf", produces = [MediaType.APPLICATION_PDF_VALUE])
    fun getPdfByPossibleOutcomeId(@PathVariable("possibleOutcomeId") possibleOutcomeId: Long): ByteArray {
        return possibleOutcomeService.getPdfByPossibleOutcomeId(possibleOutcomeId)
    }
}

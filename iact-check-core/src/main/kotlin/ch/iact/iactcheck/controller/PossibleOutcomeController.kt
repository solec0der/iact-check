package ch.iact.iactcheck.controller

import ch.iact.iactcheck.service.PossibleOutcomeService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/possible-outcomes")
internal class PossibleOutcomeController(
    private val possibleOutcomeService: PossibleOutcomeService
) {
    @GetMapping("/{possibleOutcomeId}/thumbnail", produces = [MediaType.IMAGE_PNG_VALUE])
    fun getThumbnailByPossibleOutcomeId(@PathVariable("possibleOutcomeId") possibleOutcomeId: Long): ByteArray {
        return possibleOutcomeService.getThumbnailByPossibleOutcomeId(possibleOutcomeId)
    }

    @GetMapping("/{possibleOutcomeId}/pdf", produces = [MediaType.APPLICATION_PDF_VALUE])
    fun getPdfByPossibleOutcomeId(@PathVariable("possibleOutcomeId") possibleOutcomeId: Long): ByteArray {
        return possibleOutcomeService.getPdfByPossibleOutcomeId(possibleOutcomeId)
    }
}

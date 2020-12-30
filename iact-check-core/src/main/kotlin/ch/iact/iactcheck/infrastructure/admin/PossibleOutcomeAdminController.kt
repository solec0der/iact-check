package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.PossibleOutcomeDTO
import ch.iact.iactcheck.service.PossibleOutcomeService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/admin/possible-outcomes")
internal class PossibleOutcomeAdminController(
        private val possibleOutcomeService: PossibleOutcomeService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createPossibleOutcome(@RequestBody possibleOutcomeDTO: PossibleOutcomeDTO): PossibleOutcomeDTO {
        return possibleOutcomeService.createPossibleOutcome(possibleOutcomeDTO)
    }

    @GetMapping("/{possibleOutcomeId}")
    fun getPossibleOutcomeById(@PathVariable("possibleOutcomeId") possibleOutcomeId: Long): PossibleOutcomeDTO {
        return possibleOutcomeService.getPossibleOutcomeById(possibleOutcomeId)
    }

    @PutMapping("/{possibleOutcomeId}/assets")
    fun uploadThumbnailForPossibleOutcome(
            @PathVariable("possibleOutcomeId") possibleOutcomeId: Long,
            @RequestParam("thumbnail") thumbnail: MultipartFile,
            @RequestParam("pdf") pdf: MultipartFile
    ) {
        possibleOutcomeService.uploadAdditionalAssetsForPossibleOutcome(possibleOutcomeId, thumbnail.bytes, pdf.bytes)
    }

    @PutMapping("/{possibleOutcomeId}")
    fun updatePossibleOutcomeById(
            @PathVariable("possibleOutcomeId") possibleOutcomeId: Long,
            @RequestBody possibleOutcomeDTO: PossibleOutcomeDTO
    ): PossibleOutcomeDTO {
        return possibleOutcomeService.updatePossibleOutcomeById(possibleOutcomeId, possibleOutcomeDTO)
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{possibleOutcomeId}")
    fun deletePossibleOutcomeById(@PathVariable("possibleOutcomeId") possibleOutcomeId: Long) {
        possibleOutcomeService.deletePossibleOutcomeById(possibleOutcomeId)
    }
}

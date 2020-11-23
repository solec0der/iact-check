package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.PossibleOutcomeDTO
import ch.iact.iactcheck.service.PossibleOutcomeService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

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

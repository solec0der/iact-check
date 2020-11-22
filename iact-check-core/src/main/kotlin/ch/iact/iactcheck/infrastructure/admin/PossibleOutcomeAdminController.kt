package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.PossibleOutcomeDTO
import ch.iact.iactcheck.service.PossibleOutcomeService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/admin/possible-outcomes")
internal class PossibleOutcomeAdminController(
        private val possibleOutcomeService: PossibleOutcomeService
) {

    @PostMapping
    fun createPossibleOutcome(@RequestBody possibleOutcomeDTO: PossibleOutcomeDTO): PossibleOutcomeDTO {
        return possibleOutcomeService.createPossibleOutcome(possibleOutcomeDTO)
    }
}
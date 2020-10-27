package ch.showlab.showlabcheck.infrastructure

import ch.showlab.showlabcheck.dto.CheckDTO
import ch.showlab.showlabcheck.service.CheckService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
internal class CheckController(
        private val checkService: CheckService
) {

    @GetMapping("/customers/{customerId}/checks")
    fun getChecksByCustomerId(@PathVariable("customerId") customerId: Long): List<CheckDTO> {
        return checkService.getChecksByCustomerId(customerId)
    }
}

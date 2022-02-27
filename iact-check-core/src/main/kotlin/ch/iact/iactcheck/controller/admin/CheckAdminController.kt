package ch.iact.iactcheck.controller.admin

import ch.iact.iactcheck.dto.CheckDTO
import ch.iact.iactcheck.service.CheckService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/checks")
internal class CheckAdminController(
    private val checkService: CheckService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createCheck(@RequestBody checkDTO: CheckDTO): CheckDTO {
        return checkService.createCheck(checkDTO)
    }


    @PutMapping("/{checkId}")
    fun updateCheckById(@PathVariable("checkId") checkId: Long, @RequestBody checkDTO: CheckDTO): CheckDTO {
        return checkService.updateCheckById(checkId, checkDTO)
    }

    @DeleteMapping("/{checkId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteCheckById(@PathVariable("checkId") checkId: Long) {
        checkService.deleteCheckById(checkId)
    }
}

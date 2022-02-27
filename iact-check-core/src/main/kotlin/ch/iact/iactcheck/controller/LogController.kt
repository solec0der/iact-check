package ch.iact.iactcheck.controller

import ch.iact.iactcheck.dto.ClientLogEntryDTO
import ch.iact.iactcheck.service.LogService
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api")
class LogController(
    private val logService: LogService
) {

    @PostMapping("/logs/client-logs")
    fun createLogEntry(
        @RequestBody clientLogEntryDTO: ClientLogEntryDTO,
        httpServletRequest: HttpServletRequest
    ): ClientLogEntryDTO {
        return logService.createClientLogEntry(clientLogEntryDTO, httpServletRequest)
    }

    @GetMapping("/admin/logs/client-logs")
    fun getClientLogs(
        @RequestParam("page") page: Int,
        @RequestParam("page-size") pageSize: Int,
        @RequestParam("log-levels", required = false, defaultValue = "") logLevels: Set<String>
    ): List<ClientLogEntryDTO> {
        return logService.getClientLogs(page, pageSize, logLevels)
    }
}
package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.model.ClientLogEntry
import ch.iact.iactcheck.domain.model.LogLevel
import ch.iact.iactcheck.domain.repository.ClientLogRepository
import ch.iact.iactcheck.dto.ClientLogEntryDTO
import ch.iact.iactcheck.service.converter.LogConverter
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Service
import javax.servlet.http.HttpServletRequest

@Service
class LogService(
    private val clientLogRepository: ClientLogRepository
) {

    fun createClientLogEntry(clientLogEntryDTO: ClientLogEntryDTO, httpRequest: HttpServletRequest): ClientLogEntryDTO {
        val clientLogEntry = ClientLogEntry(
            logLevel = LogLevel.valueOf(clientLogEntryDTO.logLevel),
            message = clientLogEntryDTO.message,
            path = clientLogEntryDTO.path,
            userAgent = httpRequest.getHeader(HttpHeaders.USER_AGENT),
            remoteIpAddress = httpRequest.remoteAddr
        )

        return LogConverter.map(clientLogRepository.save(clientLogEntry))
    }

    fun getClientLogs(page: Int, pageSize: Int, logLevels: Set<String>): List<ClientLogEntryDTO> {
        val pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "timestamp"))
        val logLevelsFilter = logLevels.map { LogLevel.valueOf(it) }.toMutableSet()

        if (logLevelsFilter.isEmpty()) {
            logLevelsFilter.addAll(LogLevel.values())
        }

        return clientLogRepository.findAllByLogLevelIn(logLevelsFilter, pageable)
            .content
            .map(LogConverter::map)
    }
}
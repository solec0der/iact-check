package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.ClientLogEntry
import ch.iact.iactcheck.dto.ClientLogEntryDTO

object LogConverter {

    fun map(clientLogEntry: ClientLogEntry): ClientLogEntryDTO {
        return ClientLogEntryDTO(
            logLevel = clientLogEntry.logLevel.name,
            message = clientLogEntry.message,
            path = clientLogEntry.path,
            userAgent = clientLogEntry.userAgent,
            remoteIpAddress = clientLogEntry.remoteIpAddress,
            timestamp = clientLogEntry.timestamp
        )
    }
}
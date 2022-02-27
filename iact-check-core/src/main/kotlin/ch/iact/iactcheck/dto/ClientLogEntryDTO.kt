package ch.iact.iactcheck.dto

import java.time.LocalDateTime

data class ClientLogEntryDTO(
    val logLevel: String,
    val message: String,
    val path: String,
    val userAgent: String?,
    val remoteIpAddress: String?,
    val timestamp: LocalDateTime?
)

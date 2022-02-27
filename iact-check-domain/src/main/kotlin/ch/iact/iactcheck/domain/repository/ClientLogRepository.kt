package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.ClientLogEntry
import ch.iact.iactcheck.domain.model.LogLevel
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository

@Repository
interface ClientLogRepository : PagingAndSortingRepository<ClientLogEntry, Long> {
    fun findAllByLogLevelIn(logLevels: Set<LogLevel>, pageable: Pageable): Page<ClientLogEntry>

    fun countAllByLogLevelIn(logLevels: Set<LogLevel>): Long
}
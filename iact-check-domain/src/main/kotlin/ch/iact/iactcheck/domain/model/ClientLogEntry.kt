package ch.iact.iactcheck.domain.model

import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "client_log_entry")
data class ClientLogEntry(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Enumerated(EnumType.STRING)
    val logLevel: LogLevel,

    val message: String,
    val path: String,
    val userAgent: String,
    val remoteIpAddress: String,

    @CreationTimestamp
    val timestamp: LocalDateTime? = null
)

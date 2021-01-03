package ch.iact.iactcheck.messaging.email

class EmailSettings(
        val smtpHost: String,
        val smtpPort: Int,
        val smtpUsername: String,
        val smtpPassword: String,
        val smtpTransportStrategy: SmtpTransportStrategy,
        val fromAddress: String,
        val fromName: String
)

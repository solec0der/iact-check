package ch.iact.iactcheck.dto

data class EmailSettingsDTO(
    val sendEmails: Boolean,
    val smtpHost: String,
    val smtpPort: Int,
    val smtpUsername: String,
    val smtpPassword: String,
    val smtpTransportStrategy: SmtpTransportStrategy,
    val fromAddress: String,
    val fromName: String
)

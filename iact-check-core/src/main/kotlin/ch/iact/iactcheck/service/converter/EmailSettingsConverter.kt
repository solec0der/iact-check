package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.EmailSettings
import ch.iact.iactcheck.dto.EmailSettingsDTO
import ch.iact.iactcheck.dto.SmtpTransportStrategy

object EmailSettingsConverter {
    fun convertEmailSettingsToDTO(emailSettings: EmailSettings): EmailSettingsDTO {
        return EmailSettingsDTO(
                sendEmails = emailSettings.sendEmails,
                smtpHost = emailSettings.smtpHost,
                smtpPort = emailSettings.smtpPort,
                smtpUsername = emailSettings.smtpUsername,
                smtpPassword = emailSettings.smtpPassword,
                smtpTransportStrategy = SmtpTransportStrategy.valueOf(emailSettings.smtpTransportStrategy.name),
                fromAddress = emailSettings.fromAddress,
                fromName = emailSettings.fromName
        )
    }
}

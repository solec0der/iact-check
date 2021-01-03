package ch.iact.iactcheck.messaging.email

object EmailSettingsConverter {

    fun convertEmailSettingsToBusinessObject(
            emailSettings: ch.iact.iactcheck.domain.model.EmailSettings
    ): EmailSettings {
        return EmailSettings(
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

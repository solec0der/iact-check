package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.TextMessageSettings
import ch.iact.iactcheck.dto.TextMessageSettingsDTO

object TextMessageSettingsConverter {
    fun convertTextMessageSettingsToDTO(textMessageSettings: TextMessageSettings?): TextMessageSettingsDTO? {
        if (textMessageSettings == null) {
            return null;
        }

        return TextMessageSettingsDTO(
            accountSid = textMessageSettings.accountSid,
            authToken = textMessageSettings.authToken,
            fromPhoneNumber = textMessageSettings.fromPhoneNumber
        )
    }

    fun convertTextMessageSettingsToBusinessObject(
        textMessageSettings: TextMessageSettings?
    ): ch.iact.iactcheck.messaging.text.TextMessageSettings? {
        if (textMessageSettings == null) {
            return null
        }

        return ch.iact.iactcheck.messaging.text.TextMessageSettings(
            accountSid = textMessageSettings.accountSid,
            authToken = textMessageSettings.authToken,
            fromPhoneNumber = textMessageSettings.fromPhoneNumber
        )
    }
}

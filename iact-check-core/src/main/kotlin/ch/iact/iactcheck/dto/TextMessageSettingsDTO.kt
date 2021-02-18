package ch.iact.iactcheck.dto

data class TextMessageSettingsDTO(
    val sendTextMessages: Boolean,
    val accountSid: String,
    val authToken: String,
    val fromPhoneNumber: String
)
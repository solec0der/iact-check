package ch.iact.iactcheck.messaging.text

data class TextMessageSettings(
    val accountSid: String,
    val authToken: String,
    val fromPhoneNumber: String
)

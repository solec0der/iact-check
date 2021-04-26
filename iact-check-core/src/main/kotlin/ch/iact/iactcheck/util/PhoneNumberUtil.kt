package ch.iact.iactcheck.util

object PhoneNumberUtil {
    private val phoneNumberValidationRegex = Regex("[+]\\d{10,14}")

    fun isValidPhoneNumber(phoneNumber: String): Boolean {
        return phoneNumberValidationRegex.matches(phoneNumber)
    }
}

package ch.iact.iactcheck.messaging.text

import ch.iact.iactcheck.messaging.Recipient

class TextMessageRecipient(
    firstName: String,
    lastName: String,
    val phoneNumber: String
) : Recipient(firstName, lastName)

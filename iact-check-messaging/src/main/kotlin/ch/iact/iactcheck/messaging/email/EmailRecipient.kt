package ch.iact.iactcheck.messaging.email

import ch.iact.iactcheck.messaging.Recipient

class EmailRecipient(
        firstName: String,
        lastName: String,
        val emailAddress: String
) : Recipient(firstName, lastName)

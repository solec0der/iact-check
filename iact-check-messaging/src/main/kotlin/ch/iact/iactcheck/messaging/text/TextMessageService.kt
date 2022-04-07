package ch.iact.iactcheck.messaging.text

import ch.iact.iactcheck.messaging.Message
import ch.iact.iactcheck.messaging.MessageService
import com.twilio.Twilio
import com.twilio.type.PhoneNumber
import org.springframework.stereotype.Service

@Service
class TextMessageService : MessageService<TextMessageSettings, TextMessageRecipient> {

    override fun sendMessage(settings: TextMessageSettings, recipient: TextMessageRecipient, message: Message) {
        Twilio.init(settings.accountSid, settings.authToken)

        com.twilio.rest.api.v2010.account.Message.creator(
            PhoneNumber(recipient.phoneNumber),
            PhoneNumber(settings.fromPhoneNumber),
            message.message
        ).create()
    }
}
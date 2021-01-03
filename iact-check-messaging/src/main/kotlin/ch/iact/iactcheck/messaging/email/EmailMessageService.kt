package ch.iact.iactcheck.messaging.email

import ch.iact.iactcheck.messaging.Message
import ch.iact.iactcheck.messaging.MessageService
import org.simplejavamail.api.email.Email
import org.simplejavamail.api.mailer.Mailer
import org.simplejavamail.api.mailer.config.TransportStrategy
import org.simplejavamail.email.EmailBuilder
import org.simplejavamail.mailer.MailerBuilder


class EmailMessageService : MessageService<EmailSettings, EmailRecipient> {

    override fun sendMessage(settings: EmailSettings, recipient: EmailRecipient, message: Message) {
        val mailer = createMailerFromServerSettings(settings);

        val email: Email = EmailBuilder.startingBlank()
                .from(settings.fromName, settings.fromAddress)
                .to(recipient.firstName + " " + recipient.lastName, recipient.emailAddress)
                .withSubject(message.subject)
                .withHTMLText(message.message)
                .buildEmail()

        mailer.sendMail(email)
    }

    private fun createMailerFromServerSettings(settings: EmailSettings): Mailer {
        return MailerBuilder
                .withSMTPServer(
                        settings.smtpHost,
                        settings.smtpPort,
                        settings.smtpUsername,
                        settings.smtpPassword
                )
                .withTransportStrategy(TransportStrategy.valueOf(settings.smtpTransportStrategy.name))
                .withSessionTimeout(10 * 1000)
                .clearEmailAddressCriteria()
                .async()
                .buildMailer()
    }
}

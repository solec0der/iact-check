package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.model.EmailSettings
import ch.iact.iactcheck.domain.model.SmtpTransportStrategy
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.domain.repository.EmailSettingsRepository
import ch.iact.iactcheck.dto.EmailSettingsDTO
import ch.iact.iactcheck.infrastructure.exception.CustomerNotFoundException
import ch.iact.iactcheck.infrastructure.exception.EmailSettingsNotFoundException
import ch.iact.iactcheck.service.converter.EmailSettingsConverter
import org.springframework.stereotype.Service

@Service
class EmailSettingsService(
        private val customerRepository: CustomerRepository,
        private val emailSettingsRepository: EmailSettingsRepository
) {
    fun createEmailSettingsByCustomerId(customerId: Long, emailSettingsDTO: EmailSettingsDTO): EmailSettingsDTO {
        val customer = customerRepository.findById(customerId).orElseThrow { throw CustomerNotFoundException() }

        val emailSettings = EmailSettings(
                id = -1,
                customer = customer,
                sendEmails = emailSettingsDTO.sendEmails,
                smtpHost = emailSettingsDTO.smtpHost,
                smtpPort = emailSettingsDTO.smtpPort,
                smtpUsername = emailSettingsDTO.smtpUsername,
                smtpPassword = emailSettingsDTO.smtpPassword,
                smtpTransportStrategy = SmtpTransportStrategy.valueOf(emailSettingsDTO.smtpTransportStrategy.name),
                fromAddress = emailSettingsDTO.fromAddress,
                fromName = emailSettingsDTO.fromName
        )
        return EmailSettingsConverter.convertEmailSettingsToDTO(emailSettingsRepository.save(emailSettings))
    }

    fun getEmailSettingsByCustomerId(customerId: Long): EmailSettingsDTO {
        return EmailSettingsConverter.convertEmailSettingsToDTO(
                emailSettingsRepository
                        .findByCustomerId(customerId)
                        .orElseThrow { throw EmailSettingsNotFoundException() }
        )
    }

    fun updateEmailSettingsByCustomerId(customerId: Long, emailSettingsDTO: EmailSettingsDTO): EmailSettingsDTO {
        val emailSettings = emailSettingsRepository
                .findByCustomerId(customerId)
                .orElseThrow { throw EmailSettingsNotFoundException() }
                .copy(
                        sendEmails = emailSettingsDTO.sendEmails,
                        smtpHost = emailSettingsDTO.smtpHost,
                        smtpPort = emailSettingsDTO.smtpPort,
                        smtpUsername = emailSettingsDTO.smtpUsername,
                        smtpPassword = emailSettingsDTO.smtpPassword,
                        smtpTransportStrategy = SmtpTransportStrategy.valueOf(emailSettingsDTO.smtpTransportStrategy.name),
                        fromAddress = emailSettingsDTO.fromAddress,
                        fromName = emailSettingsDTO.fromName
                )
        return EmailSettingsConverter.convertEmailSettingsToDTO(emailSettingsRepository.save(emailSettings))
    }
}

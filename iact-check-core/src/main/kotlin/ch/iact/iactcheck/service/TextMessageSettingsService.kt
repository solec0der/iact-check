package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.model.TextMessageSettings
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.domain.repository.TextMessageSettingsRepository
import ch.iact.iactcheck.dto.TextMessageSettingsDTO
import ch.iact.iactcheck.controller.exception.CustomerNotFoundException
import ch.iact.iactcheck.controller.exception.TextMessageSettingsNotFoundException
import ch.iact.iactcheck.service.converter.TextMessageSettingsConverter
import org.springframework.stereotype.Service

@Service
class TextMessageSettingsService(
    private val customerRepository: CustomerRepository,
    private val textMessageSettingsRepository: TextMessageSettingsRepository
) {
    fun createTextMessageSettingsByCustomerId(customerId: Long, textMessageSettingsDTO: TextMessageSettingsDTO): TextMessageSettingsDTO? {
        val customer = customerRepository.findById(customerId).orElseThrow { throw CustomerNotFoundException() }

        val textMessageSettings = TextMessageSettings(
            id = -1,
            customer = customer,
            sendTextMessages = textMessageSettingsDTO.sendTextMessages,
            accountSid = textMessageSettingsDTO.accountSid,
            authToken = textMessageSettingsDTO.authToken,
            fromPhoneNumber = textMessageSettingsDTO.fromPhoneNumber
        )
        return TextMessageSettingsConverter.convertTextMessageSettingsToDTO(textMessageSettingsRepository.save(textMessageSettings))
    }

    fun getTextMessageSettingsByCustomerId(customerId: Long): TextMessageSettingsDTO? {
        return TextMessageSettingsConverter.convertTextMessageSettingsToDTO(
            textMessageSettingsRepository.findByCustomerId(customerId)
                .orElse(null)
        )
    }

    fun updateTextMessageSettingsByCustomerId(customerId: Long, textMessageSettingsDTO: TextMessageSettingsDTO): TextMessageSettingsDTO? {
        val textMessageSettings = textMessageSettingsRepository
            .findByCustomerId(customerId)
            .orElseThrow { throw TextMessageSettingsNotFoundException() }
            .copy(
                sendTextMessages = textMessageSettingsDTO.sendTextMessages,
                accountSid = textMessageSettingsDTO.accountSid,
                authToken = textMessageSettingsDTO.authToken,
                fromPhoneNumber = textMessageSettingsDTO.fromPhoneNumber
            )
        return TextMessageSettingsConverter.convertTextMessageSettingsToDTO(textMessageSettingsRepository.save(textMessageSettings))
    }
}
package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.TextMessageSettingsDTO
import ch.iact.iactcheck.service.TextMessageSettingsService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin")
internal class TextMessageSettingsController(
    private val textMessageSettingsService: TextMessageSettingsService
) {

    @PostMapping("/customers/{customerId}/settings/text-message")
    fun createTextMessageSettingsByCustomerId(
        @PathVariable("customerId") customerId: Long,
        @RequestBody textMessageSettingsDTO: TextMessageSettingsDTO
    ): TextMessageSettingsDTO? {
        return textMessageSettingsService.createTextMessageSettingsByCustomerId(customerId, textMessageSettingsDTO)
    }

    @GetMapping("/customers/{customerId}/settings/text-message")
    fun getTextMessageSettingsByCustomerId(@PathVariable("customerId") customerId: Long): TextMessageSettingsDTO? {
        return textMessageSettingsService.getTextMessageSettingsByCustomerId(customerId)
    }

    @PutMapping("/customers/{customerId}/settings/text-message")
    fun updateTextMessageSettingsByCustomerId(
        @PathVariable("customerId") customerId: Long,
        @RequestBody textMessageSettingsDTO: TextMessageSettingsDTO
    ): TextMessageSettingsDTO? {
        return textMessageSettingsService.updateTextMessageSettingsByCustomerId(customerId, textMessageSettingsDTO)
    }
}
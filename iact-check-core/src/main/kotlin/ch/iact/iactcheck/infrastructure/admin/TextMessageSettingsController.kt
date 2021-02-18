package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.TextMessageSettingsDTO
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin")
internal class TextMessageSettingsController {

    @PostMapping("/customers/{customerId}/settings/text-message")
    fun createTextMessageSettingsByCustomerId(
        @PathVariable("customerId") customerId: Long,
        @RequestBody textMessageSettingsDTO: TextMessageSettingsDTO
    ): TextMessageSettingsDTO? {
        return null
    }

    @GetMapping("/customers/{customerId}/settings/text-message")
    fun getTextMessageSettingsByCustomerId(@PathVariable("customerId") customerId: Long): TextMessageSettingsDTO? {
        return null
    }

    @PutMapping("/customers/{customerId}/settings/text-message")
    fun updateTextMessageSettingsByCustomerId(
        @PathVariable("customerId") customerId: Long,
        @RequestBody textMessageSettingsDTO: TextMessageSettingsDTO
    ): TextMessageSettingsDTO? {
        return null
    }
}
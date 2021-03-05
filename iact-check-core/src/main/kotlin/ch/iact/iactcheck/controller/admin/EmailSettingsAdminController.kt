package ch.iact.iactcheck.controller.admin

import ch.iact.iactcheck.dto.EmailSettingsDTO
import ch.iact.iactcheck.service.EmailSettingsService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin")
internal class EmailSettingsAdminController(
    private val emailSettingsService: EmailSettingsService
) {

    @PostMapping("/customers/{customerId}/settings/email")
    fun createEmailSettingsByCustomerId(
        @PathVariable("customerId") customerId: Long,
        @RequestBody emailSettingsDTO: EmailSettingsDTO
    ): EmailSettingsDTO? {
        return emailSettingsService.createEmailSettingsByCustomerId(customerId, emailSettingsDTO)
    }

    @GetMapping("/customers/{customerId}/settings/email")
    fun getEmailSettingsByCustomerId(@PathVariable("customerId") customerId: Long): EmailSettingsDTO? {
        return emailSettingsService.getEmailSettingsByCustomerId(customerId)
    }

    @PutMapping("/customers/{customerId}/settings/email")
    fun updateEmailSettingsByCustomerId(
        @PathVariable("customerId") customerId: Long,
        @RequestBody emailSettingsDTO: EmailSettingsDTO
    ): EmailSettingsDTO? {
        return emailSettingsService.updateEmailSettingsByCustomerId(customerId, emailSettingsDTO)
    }
}

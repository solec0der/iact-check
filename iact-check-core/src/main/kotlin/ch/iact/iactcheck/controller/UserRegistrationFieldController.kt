package ch.iact.iactcheck.controller

import ch.iact.iactcheck.dto.UserRegistrationFieldsDTO
import ch.iact.iactcheck.service.UserRegistrationFieldService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/user-registration-fields")
internal class UserRegistrationFieldController(
    private val userRegistrationFieldService: UserRegistrationFieldService
) {

    @GetMapping
    fun getUserRegistrationFields(): UserRegistrationFieldsDTO {
        return userRegistrationFieldService.getUserRegistrationFields()
    }
}
package ch.showlab.showlabcheck.infrastructure

import ch.showlab.showlabcheck.dto.UserDTO
import ch.showlab.showlabcheck.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/users")
class UserController(
    private val userService: UserService
) {

    @PostMapping
    fun createUser(@RequestBody userDTO: UserDTO): UserDTO {
        return userService.createUser(userDTO)
    }
}

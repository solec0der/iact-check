package ch.showlab.showlabcheck.infrastructure.admin

import ch.showlab.showlabcheck.dto.UserDTO
import ch.showlab.showlabcheck.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.annotation.security.RolesAllowed

@RestController
@RolesAllowed("SUPERUSER")
@RequestMapping("/api/admin/users")
class UserAdminController(
        private val userService: UserService
) {
    @PostMapping
    fun createUser(@RequestBody userDTO: UserDTO): UserDTO {
        return userService.createUser(userDTO)
    }
}

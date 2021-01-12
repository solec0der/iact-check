package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.service.KeycloakAdminService
import org.keycloak.representations.idm.RoleRepresentation
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/admin/keycloak")
internal class KeycloakAdminController(
    private val keycloakAdminService: KeycloakAdminService
) {

    @GetMapping("/users")
    fun getUsers(): List<UserRepresentation> {
        return keycloakAdminService.getUsers()
    }

    @GetMapping("/users/{userId}/roles")
    fun getRolesByUserId(@PathVariable("userId") userId: String): List<RoleRepresentation> {
        return keycloakAdminService.getRolesByUserId(userId)
    }
}

package ch.iact.iactcheck.webapp.infrastructure

import ch.iact.iactcheck.webapp.dto.KeycloakInfoDTO
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/keycloak-info")
internal class KeycloakInfoController(
    @Value("\${keycloak.auth-server-url}") private val authServerUrl: String,
    @Value("\${keycloak.realm}") private val realm: String
) {

    @GetMapping
    fun getKeycloakInfo(): KeycloakInfoDTO {
        return KeycloakInfoDTO(
            authServerUrl = authServerUrl,
            realm = realm
        )
    }
}

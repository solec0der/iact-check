package ch.iact.iactcheck.service

import ch.iact.iactcheck.dto.UserDTO
import ch.iact.iactcheck.infrastructure.exception.UserNotLoggedInException
import org.keycloak.KeycloakPrincipal
import org.keycloak.representations.AccessToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class UserService {

    fun getLoggedInUser(): UserDTO {
        val securityContext = SecurityContextHolder.getContext()
        val authentication = securityContext.authentication

        if (authentication.principal is KeycloakPrincipal<*>) {
            val principal = authentication.principal as KeycloakPrincipal<*>
            val token = principal.keycloakSecurityContext.token
            return createUserFromAccessToken(token)
        }
        throw UserNotLoggedInException()
    }

    fun isLoggedInUserSuperUser(): Boolean {
        return getLoggedInUser().roles.any { it == "SUPERUSER" }
    }

    private fun createUserFromAccessToken(accessToken: AccessToken): UserDTO {
        return UserDTO(
            userId = accessToken.subject,
            preferredUsername = accessToken.preferredUsername,
            email = accessToken.email ?: "",
            roles = accessToken.realmAccess.roles
        )
    }
}

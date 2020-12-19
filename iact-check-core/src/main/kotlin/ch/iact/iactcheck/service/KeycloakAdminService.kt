package ch.iact.iactcheck.service

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder
import org.keycloak.OAuth2Constants
import org.keycloak.admin.client.Keycloak
import org.keycloak.admin.client.KeycloakBuilder
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import javax.ws.rs.BadRequestException

@Service
class KeycloakAdminService(
        @Value("\${keycloak.auth-server-url}") private val serverUrl: String,
        @Value("\${keycloak.realm}") private val realm: String,
        @Value("\${keycloak.resource}") private val clientId: String,
        @Value("\${keycloak.credentials.secret}") private val clientSecret: String
) {

    private val keycloak: Keycloak = KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
            .realm(realm)
            .clientId(clientId)
            .clientSecret(clientSecret)
            .resteasyClient(
                    ResteasyClientBuilder()
                            .connectionPoolSize(10).build()
            )
            .build();

    fun getUsers(): List<UserRepresentation> {
        return this.keycloak.realm(this.realm).users().list()
    }
}

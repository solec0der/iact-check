package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.domain.model.User
import ch.showlab.showlabcheck.dto.UserDTO

object UserConverter {

    fun convertUserToDTO(user: User): UserDTO {
        return UserDTO(
                id = user.id,
                username = user.username,
                roles = user.roles.map { RoleConverter.convertRoleToDTO(it) }.toSet()
        )
    }
}

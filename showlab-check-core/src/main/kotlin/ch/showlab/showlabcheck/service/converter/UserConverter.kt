package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.domain.model.Role
import ch.showlab.showlabcheck.domain.model.User
import ch.showlab.showlabcheck.dto.RoleDTO
import ch.showlab.showlabcheck.dto.UserDTO

object UserConverter {

    fun convertUserToDTO(user: User): UserDTO {
        return UserDTO(
                id = user.id,
                username = user.username,
                roles = user.roles.map { convertRoleToDTO(it) }.toSet()
        )
    }

    private fun convertRoleToDTO(role: Role): RoleDTO {
        return RoleDTO(
                id = role.id,
                name = role.name
        )
    }
}

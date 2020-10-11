package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.domain.model.Role
import ch.showlab.showlabcheck.dto.RoleDTO

object RoleConverter {

    fun convertRoleToDTO(role: Role): RoleDTO {
        return RoleDTO(
                id = role.id,
                name = role.name
        )
    }
}

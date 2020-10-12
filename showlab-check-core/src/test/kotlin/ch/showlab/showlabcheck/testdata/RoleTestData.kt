package ch.showlab.showlabcheck.testdata

import ch.showlab.showlabcheck.domain.model.Role
import ch.showlab.showlabcheck.dto.RoleDTO

object RoleTestData {

    fun getRoleDto(): RoleDTO {
        return RoleDTO(
                id = 1L,
                name = "SUPERUSER"
        )
    }

    fun getRole2Dto(): RoleDTO {
        return RoleDTO(
                id = 2L,
                name = "ORGANIZATION_ADMINISTRATOR"
        )
    }

    fun getRole(): Role {
        return Role(
                id = 1L,
                name = "SUPERUSER"
        )
    }

    fun getRole2(): Role {
        return Role(
                id = 2L,
                name = "ORGANIZATION_ADMINISTRATOR"
        )
    }
}

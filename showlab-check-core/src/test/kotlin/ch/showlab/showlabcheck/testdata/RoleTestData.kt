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

    fun getRole(): Role {
        return Role(
                id = 1L,
                name = "SUPERUSER",
                users = emptySet()
        )
    }
}

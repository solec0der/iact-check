package ch.showlab.showlabcheck.testdata

import ch.showlab.showlabcheck.domain.model.Role
import ch.showlab.showlabcheck.dto.RoleDTO

object RoleTestData {

    val roleDTO = RoleDTO(
            id = 1L,
            name = "SUPERUSER"
    )

    val role2DTO = RoleDTO(
            id = 2L,
            name = "ORGANIZATION_ADMINISTRATOR"
    )

    val role = Role(
            id = 1L,
            name = "SUPERUSER"
    )

    val role2 = Role(
            id = 2L,
            name = "ORGANIZATION_ADMINISTRATOR"
    )
}

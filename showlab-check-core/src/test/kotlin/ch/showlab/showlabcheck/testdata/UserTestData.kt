package ch.showlab.showlabcheck.testdata

import ch.showlab.showlabcheck.domain.model.User
import ch.showlab.showlabcheck.dto.UserDTO

object UserTestData {

    fun getUserDto(): UserDTO {
        return UserDTO(
                id = 1L,
                username = "superuser",
                roles = setOf(RoleTestData.getRoleDto())
        )
    }

    fun getUser2Dto(): UserDTO {
        return UserDTO(
                id = 2L,
                username = "ef-admin",
                roles = setOf(RoleTestData.getRoleDto())
        )
    }

    fun getUser(): User {
        return User(
                id = 1L,
                username = "superuser",
                password = "superuser",
                roles = setOf(RoleTestData.getRole())
        )
    }

    fun getUser2(): User {
        return User(
                id = 2L,
                username = "ef-admin",
                password = "ef-admin",
                roles = setOf(RoleTestData.getRole())
        )
    }
}

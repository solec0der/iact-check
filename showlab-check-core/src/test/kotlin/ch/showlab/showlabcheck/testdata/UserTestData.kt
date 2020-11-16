package ch.showlab.showlabcheck.testdata

import ch.showlab.showlabcheck.domain.model.User
import ch.showlab.showlabcheck.dto.UserDTO

object UserTestData {

    val user = User(
            id = 1L,
            username = "superuser",
            password = "superuser",
            roles = setOf(RoleTestData.role),
            accessibleCustomers = listOf(CustomerTestData.customer)
    )

    val user2 = User(
            id = 2L,
            username = "ef-admin",
            password = "ef-admin",
            roles = setOf(RoleTestData.role2),
            accessibleCustomers = listOf(CustomerTestData.customer2)
    )

    val userDTO = UserDTO(
            id = 1L,
            username = "superuser",
            roles = setOf(RoleTestData.roleDTO),
            accessibleCustomers = listOf(
                    CustomerTestData.customerDTO
            )
    )

    val user2DTO = UserDTO(
            id = 2L,
            username = "ef-admin",
            roles = setOf(RoleTestData.role2DTO),
            accessibleCustomers = listOf(
                    CustomerTestData.customer2DTO
            )
    )
}

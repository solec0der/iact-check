package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.dto.CustomerDTO

object CustomerTestData {

    val customer = Customer(
        id = 1L,
        name = "EXPOFORMER",
        usersWithAccess = emptySet(),
        checks = emptyList(),
        customerBranding = null,
        activeUserRegistrationFields = emptySet()
    )

    val customer2 = Customer(
        id = 2L,
        name = "POLYPOINT",
        usersWithAccess = emptySet(),
        checks = emptyList(),
        customerBranding = null,
        activeUserRegistrationFields = emptySet()
    )

    val customer3NoLogo = Customer(
        id = 2L,
        name = "POLYPOINT",
        usersWithAccess = setOf(UserTestData.userDTO2.userId),
        checks = emptyList(),
        customerBranding = null,
        activeUserRegistrationFields = emptySet()
    )

    val customerDTO = CustomerDTO(
        id = 1L,
        name = "EXPOFORMER",
        usersWithAccess = emptySet(),
        activeUserRegistrationFields = emptySet()
    )

    val customer2DTO = CustomerDTO(
        id = 2L,
        name = "POLYPOINT",
        usersWithAccess = emptySet(),
        activeUserRegistrationFields = emptySet()
    )
}

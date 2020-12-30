package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.dto.CustomerDTO

object CustomerTestData {

    val customer = Customer(
            id = 1L,
            name = "EXPOFORMER",
            primaryColour = "#FFFAAA",
            backgroundColour = "#fafafa",
            accentColour = "#AAAFFF",
            textColour = "#000000",
            font = "Roboto",
            usersWithAccess = emptySet(),
            logo = ByteArray(100),
            checks = emptyList()
    )

    val customer2 = Customer(
            id = 2L,
            name = "POLYPOINT",
            primaryColour = "#FFFAAA",
            backgroundColour = "#fafafa",
            accentColour = "#AAAFFF",
            textColour = "#000000",
            font = "Roboto",
            usersWithAccess = emptySet(),
            logo = ByteArray(100),
            checks = emptyList()
    )

    val customer3NoLogo = Customer(
            id = 2L,
            name = "POLYPOINT",
            primaryColour = "#FFFAAA",
            backgroundColour = "#fafafa",
            accentColour = "#AAAFFF",
            textColour = "#000000",
            font = "Roboto",
            usersWithAccess = setOf(UserTestData.userDTO2.userId),
            logo = ByteArray(0),
            checks = emptyList()
    )

    val customerDTO = CustomerDTO(
            id = 1L,
            name = "EXPOFORMER",
            primaryColour = "#FFFAAA",
            backgroundColour = "#fafafa",
            accentColour = "#AAAFFF",
            textColour = "#000000",
            font = "Roboto",
            usersWithAccess = emptySet()
    )

    val customer2DTO = CustomerDTO(
            id = 2L,
            name = "POLYPOINT",
            primaryColour = "#FFFAAA",
            backgroundColour = "#fafafa",
            accentColour = "#AAAFFF",
            textColour = "#000000",
            font = "Roboto",
            usersWithAccess = emptySet()
    )
}

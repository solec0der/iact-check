package ch.showlab.showlabcheck.testdata

import ch.showlab.showlabcheck.domain.model.Customer
import ch.showlab.showlabcheck.dto.CustomerDTO

object CustomerTestData {

    val customer = Customer(
            id = 1L,
            name = "EXPOFORMER",
            primaryColour = "#FFFAAA",
            accentColour = "#AAAFFF",
            users = emptyList(),
            logo = ByteArray(100),
            checks = emptyList()
    )

    val customer2 = Customer(
            id = 2L,
            name = "POLYPOINT",
            primaryColour = "#FFFAAA",
            accentColour = "#AAAFFF",
            users = emptyList(),
            logo = ByteArray(100),
            checks = emptyList()
    )

    val customerDTO = CustomerDTO(
            id = 1L,
            name = "EXPOFORMER",
            primaryColour = "#FFFAAA",
            accentColour = "#AAAFFF"
    )

    val customer2DTO = CustomerDTO(
            id = 2L,
            name = "POLYPOINT",
            primaryColour = "#FFFAAA",
            accentColour = "#AAAFFF"
    )
}

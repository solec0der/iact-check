package ch.showlab.showlabcheck.testdata

import ch.showlab.showlabcheck.domain.model.Customer
import ch.showlab.showlabcheck.dto.CustomerDTO

object CustomerTestData {

    fun getCustomerDto(): CustomerDTO {
        return CustomerDTO(
                id = 1L,
                name = "EXPOFORMER",
                primaryColour = "#FFFAAA",
                accentColour = "#AAAFFF"
        )
    }

    fun getCustomer2Dto(): CustomerDTO {
        return CustomerDTO(
                id = 2L,
                name = "POLYPOINT",
                primaryColour = "#FFFAAA",
                accentColour = "#AAAFFF"
        )
    }

    fun getCustomer(): Customer {
        return Customer(
                id = 1L,
                name = "EXPOFORMER",
                primaryColour = "#FFFAAA",
                accentColour = "#AAAFFF",
                users = emptyList(),
                logo = ByteArray(100),
                checks = emptyList()
        )
    }

    fun getCustomer2(): Customer {
        return Customer(
                id = 2L,
                name = "POLYPOINT",
                primaryColour = "#FFFAAA",
                accentColour = "#AAAFFF",
                users = emptyList(),
                logo = ByteArray(100),
                checks = emptyList()
        )
    }
}

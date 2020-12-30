package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.dto.CustomerDTO

object CustomerConverter {

    fun convertCustomerToDTO(customer: Customer): CustomerDTO {
        return CustomerDTO(
                id = customer.id,
                name = customer.name,
                primaryColour = customer.primaryColour,
                backgroundColour = customer.backgroundColour,
                accentColour = customer.accentColour,
                textColour = customer.textColour,
                font = customer.font,
                usersWithAccess = customer.usersWithAccess
        )
    }
}

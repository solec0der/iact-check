package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.domain.model.Customer
import ch.showlab.showlabcheck.dto.CustomerDTO

object CustomerConverter {

    fun convertCustomerToDTO(customer: Customer): CustomerDTO {
        return CustomerDTO(
                id = customer.id,
                name = customer.name,
                primaryColour = customer.primaryColour,
                accentColour = customer.accentColour
        )
    }
}

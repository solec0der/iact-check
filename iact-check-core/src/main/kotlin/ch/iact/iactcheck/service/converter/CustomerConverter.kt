package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.dto.CustomerDTO

object CustomerConverter {

    fun convertCustomerToDTO(customer: Customer): CustomerDTO {
        return CustomerDTO(
            id = customer.id,
            name = customer.name,
            customerBranding = CustomerBrandingConverter.convertCustomerBrandingToDTO(customer.customerBranding),
            usersWithAccess = customer.usersWithAccess,
            activeUserRegistrationFields = customer.activeUserRegistrationFields
                .map { UserRegistrationFieldConverter.convertActiveUserRegistrationToDTO(it) }
                .toSet()
        )
    }
}

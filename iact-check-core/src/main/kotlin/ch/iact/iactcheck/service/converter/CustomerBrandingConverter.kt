package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.domain.model.CustomerBranding
import ch.iact.iactcheck.dto.CustomerBrandingDTO

object CustomerBrandingConverter {

    fun convertCustomerBrandingToDTO(customerBranding: CustomerBranding?): CustomerBrandingDTO? {
        if (customerBranding == null) {
            return null
        }

        return CustomerBrandingDTO(
            id = customerBranding.id,
            customerId = customerBranding.id,
            primaryColour = customerBranding.primaryColour,
            backgroundColour = customerBranding.backgroundColour,
            accentColour = customerBranding.accentColour,
            textColour = customerBranding.textColour,
            font = customerBranding.font
        )
    }

    fun convertCustomerBrandingToDomain(
        customerBrandingDTO: CustomerBrandingDTO?,
        customer: Customer
    ): CustomerBranding? {
        if (customerBrandingDTO == null) {
            return null
        }

        return CustomerBranding(
            id = -1,
            customer = customer,
            primaryColour = customerBrandingDTO.primaryColour,
            backgroundColour = customerBrandingDTO.backgroundColour,
            accentColour = customerBrandingDTO.accentColour,
            textColour = customerBrandingDTO.textColour,
            font = customerBrandingDTO.font
        )
    }
}

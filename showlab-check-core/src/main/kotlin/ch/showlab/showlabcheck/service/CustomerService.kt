package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.domain.model.Customer
import ch.showlab.showlabcheck.domain.repository.CustomerRepository
import ch.showlab.showlabcheck.dto.CustomerDTO
import ch.showlab.showlabcheck.infrastructure.exception.CustomerAlreadyExistsException
import ch.showlab.showlabcheck.infrastructure.exception.CustomerNotFoundException
import ch.showlab.showlabcheck.infrastructure.exception.ForbiddenException
import ch.showlab.showlabcheck.infrastructure.exception.ImageNotFoundException
import ch.showlab.showlabcheck.service.converter.CustomerConverter
import org.springframework.stereotype.Service

@Service
class CustomerService(
        private val userService: UserService,
        private val customerRepository: CustomerRepository
) {

    fun createCustomer(customerDTO: CustomerDTO): CustomerDTO {
        if (customerRepository.existsByName(customerDTO.name)) {
            throw CustomerAlreadyExistsException()
        }

        val customer = Customer(
                id = -1,
                name = customerDTO.name,
                primaryColour = customerDTO.primaryColour,
                accentColour = customerDTO.accentColour,
                usersWithAccess = emptySet(),
                checks = emptyList()
        )

        return CustomerConverter.convertCustomerToDTO(customerRepository.save(customer))
    }

    fun getCustomers(): List<CustomerDTO> {
        val customers = customerRepository.findAll()

        return customers
                .map { CustomerConverter.convertCustomerToDTO(it) }
                .toList()
    }

    fun getAccessibleCustomers(): List<CustomerDTO> {
        val loggedInUser = userService.getLoggedInUser()

        val customers = if (loggedInUser.roles.any { it == "SUPERUSER" }) {
            customerRepository.findAll()
        } else {
            customerRepository.findAllByUsersWithAccess(loggedInUser.userId)
        }

        return customers
                .map { CustomerConverter.convertCustomerToDTO(it) }
                .toList()
    }

    fun getCustomerLogoByCustomerId(customerId: Long): ByteArray {
        val customer = customerRepository.findById(customerId).orElseThrow { throw CustomerNotFoundException() }

        if (customer.logo.isEmpty()) {
            throw ImageNotFoundException()
        }

        return customer.logo
    }

    fun uploadCustomerLogo(customerId: Long, logo: ByteArray) {
        var customer = customerRepository.findById(customerId).orElseThrow { throw CustomerNotFoundException() }

        if (!isLoggedInUserAllowedToModifyCustomer(customer)) {
            throw ForbiddenException()
        }

        customer = customer.copy(logo = logo)

        customerRepository.save(customer)
    }

    fun updateCustomerById(customerId: Long, customerDTO: CustomerDTO): CustomerDTO {
        var customer = customerRepository.findById(customerId).orElseThrow { throw CustomerNotFoundException() }

        if (!isLoggedInUserAllowedToModifyCustomer(customer)) {
            throw ForbiddenException()
        }

        if (customerRepository.existsByName(customerDTO.name)) {
            throw CustomerAlreadyExistsException()
        }

        customer = customer.copy(
                name = customerDTO.name,
                primaryColour = customerDTO.primaryColour,
                accentColour = customerDTO.accentColour
        )

        return CustomerConverter.convertCustomerToDTO(customerRepository.save(customer))
    }

    fun deleteCustomerById(customerId: Long) {
        customerRepository.deleteById(customerId)
    }

    private fun isLoggedInUserAllowedToModifyCustomer(customer: Customer): Boolean {
        val loggedInUser = userService.getLoggedInUser()

        return loggedInUser.roles.any { it == "SUPERUSER" } || customer.usersWithAccess.any { it == loggedInUser.userId }
    }
}

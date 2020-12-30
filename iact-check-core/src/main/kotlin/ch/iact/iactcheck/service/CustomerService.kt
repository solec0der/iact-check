package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.dto.CustomerDTO
import ch.iact.iactcheck.infrastructure.exception.CustomerAlreadyExistsException
import ch.iact.iactcheck.infrastructure.exception.CustomerNotFoundException
import ch.iact.iactcheck.infrastructure.exception.ForbiddenException
import ch.iact.iactcheck.service.converter.CustomerConverter
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
                backgroundColour = customerDTO.backgroundColour,
                accentColour = customerDTO.accentColour,
                textColour = customerDTO.textColour,
                font = customerDTO.font,
                usersWithAccess = customerDTO.usersWithAccess,
                checks = emptyList()
        )

        return CustomerConverter.convertCustomerToDTO(customerRepository.save(customer))
    }

    fun getCustomers(): List<CustomerDTO> {
        val customers = customerRepository.findAll()

        return customers
                .map { CustomerConverter.convertCustomerToDTO(it.copy(usersWithAccess = emptySet())) }
                .toList()
    }

    fun getCustomerById(customerId: Long): CustomerDTO {
        return CustomerConverter.convertCustomerToDTO(
                customerRepository.findById(customerId).orElseThrow { throw CustomerNotFoundException() }
        )
    }

    fun getAccessibleCustomers(): List<CustomerDTO> {
        val loggedInUser = userService.getLoggedInUser()

        var customers = if (loggedInUser.roles.any { it == "SUPERUSER" }) {
            customerRepository.findAll()
        } else {
            customerRepository.findAllByUsersWithAccess(loggedInUser.userId)
        }

        if (!userService.isLoggedInUserSuperUser()) {
            customers = customers.map { it.copy(usersWithAccess = emptySet()) }.toList()
        }

        return customers
                .map { CustomerConverter.convertCustomerToDTO(it) }
                .toList()
    }

    fun getCustomerLogoByCustomerId(customerId: Long): ByteArray {
        val customer = customerRepository.findById(customerId).orElseThrow { throw CustomerNotFoundException() }

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

        if (customer.name != customerDTO.name && customerRepository.existsByName(customerDTO.name)) {
            throw CustomerAlreadyExistsException()
        }

        customer = customer.copy(
                name = customerDTO.name,
                primaryColour = customerDTO.primaryColour,
                backgroundColour = customerDTO.backgroundColour,
                accentColour = customerDTO.accentColour,
                textColour = customerDTO.textColour,
                font = customerDTO.font,
                usersWithAccess = if (userService.isLoggedInUserSuperUser()) customerDTO.usersWithAccess else customer.usersWithAccess
        )

        customer = customerRepository.save(customer)

        if (!userService.isLoggedInUserSuperUser()) {
            customer = customer.copy(usersWithAccess = emptySet())
        }

        return CustomerConverter.convertCustomerToDTO(customer)
    }

    fun deleteCustomerById(customerId: Long) {
        customerRepository.deleteById(customerId)
    }

    private fun isLoggedInUserAllowedToModifyCustomer(customer: Customer): Boolean {
        val loggedInUser = userService.getLoggedInUser()

        return userService.isLoggedInUserSuperUser() || customer.usersWithAccess.any { it == loggedInUser.userId }
    }
}

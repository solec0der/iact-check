package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.domain.repository.ActiveUserRegistrationFieldRepository
import ch.iact.iactcheck.domain.repository.UserRegistrationFieldRepository
import ch.iact.iactcheck.domain.repository.CustomerBrandingRepository
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.dto.CustomerDTO
import ch.iact.iactcheck.infrastructure.exception.*
import ch.iact.iactcheck.service.converter.CustomerBrandingConverter
import ch.iact.iactcheck.service.converter.CustomerConverter
import ch.iact.iactcheck.service.converter.UserRegistrationFieldConverter
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CustomerService(
    private val userService: UserService,
    private val customerRepository: CustomerRepository,
    private val customerBrandingRepository: CustomerBrandingRepository,
    private val userRegistrationFieldRepository: UserRegistrationFieldRepository,
    private val activeUserRegistrationFieldRepository: ActiveUserRegistrationFieldRepository
) {

    fun createCustomer(customerDTO: CustomerDTO): CustomerDTO {
        if (customerRepository.existsByName(customerDTO.name)) {
            throw CustomerAlreadyExistsException()
        }

        val customer = Customer(
            id = -1,
            name = customerDTO.name,
            usersWithAccess = customerDTO.usersWithAccess,
            checks = emptyList(),
            customerBranding = null,
            activeUserRegistrationFields = emptySet()
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

        return customer.customerBranding?.logo ?: ByteArray(0)
    }

    fun uploadCustomerLogo(customerId: Long, logo: ByteArray) {
        var customer = customerRepository.findById(customerId).orElseThrow { throw CustomerNotFoundException() }

        if (!isLoggedInUserAllowedToModifyCustomer(customer)) {
            throw ForbiddenException()
        }

        if (customer.customerBranding == null) {
            throw CustomerBrandingNotFoundException()
        }

        customer = customer.copy(
            customerBranding = customer.customerBranding!!.copy(
                logo = logo
            )
        )

        customerRepository.save(customer)
    }

    @Transactional
    fun updateCustomerById(customerId: Long, customerDTO: CustomerDTO): CustomerDTO {
        var customer = customerRepository.findById(customerId).orElseThrow { throw CustomerNotFoundException() }

        if (!isLoggedInUserAllowedToModifyCustomer(customer)) {
            throw ForbiddenException()
        }

        if (customer.name != customerDTO.name && customerRepository.existsByName(customerDTO.name)) {
            throw CustomerAlreadyExistsException()
        }
        var updatedCustomerBranding = CustomerBrandingConverter.convertCustomerBrandingToDomain(
            customerDTO.customerBranding,
            customer
        )
        updatedCustomerBranding = customerBrandingRepository.save(updatedCustomerBranding!!)

        activeUserRegistrationFieldRepository.deleteAllByCustomerId(customerId)

        customer = customer.copy(
            name = customerDTO.name,
            usersWithAccess = if (userService.isLoggedInUserSuperUser()) customerDTO.usersWithAccess else customer.usersWithAccess,
            customerBranding = updatedCustomerBranding,
            activeUserRegistrationFields = customerDTO.activeUserRegistrationFields
                .map {
                    activeUserRegistrationFieldRepository.save(
                        UserRegistrationFieldConverter.convertActiveUserRegistrationToDomain(
                            activeUserRegistrationFieldDTO = it,
                            customer = customer,
                            userRegistrationField = userRegistrationFieldRepository
                                .findById(it.userRegistrationFieldId)
                                .orElseThrow { throw UserRegistrationFieldNotFoundException() }
                        ))
                }.toSet()
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

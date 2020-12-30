package ch.iact.iactcheck.service

import ch.iact.iactcheck.IactCheckApplication
import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.dto.CustomerDTO
import ch.iact.iactcheck.infrastructure.exception.CustomerAlreadyExistsException
import ch.iact.iactcheck.infrastructure.exception.CustomerNotFoundException
import ch.iact.iactcheck.infrastructure.exception.ForbiddenException
import ch.iact.iactcheck.testdata.CustomerTestData
import ch.iact.iactcheck.testdata.UserTestData
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.boot.test.context.SpringBootTest
import java.util.*

@RunWith(MockitoJUnitRunner::class)
@SpringBootTest(classes = [IactCheckApplication::class])
class CustomerServiceTest {

    @InjectMocks
    private val customerService: CustomerService? = null

    @Mock
    private val userService: UserService? = null

    @Mock
    private val customerRepository: CustomerRepository? = null

    @Test
    fun shouldCreateCustomerAndReturnCreatedCustomer() {
        val input = CustomerDTO(
                id = 0L,
                name = "EXPOFORMER",
                primaryColour = "#FFFAAA",
                backgroundColour = "#fafafa",
                accentColour = "#AAAFFF",
                textColour = "#000000",
                font = "Roboto",
                usersWithAccess = emptySet()
        )

        `when`(customerRepository!!.existsByName("EXPOFORMER")).thenReturn(false)
        `when`(customerRepository.save(any(Customer::class.java))).thenReturn(CustomerTestData.customer)

        val expected = CustomerTestData.customerDTO
        val actual = customerService!!.createCustomer(input)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowCustomerAlreadyExistsExceptionWhenCreatingExistingCustomer() {
        `when`(customerRepository!!.existsByName("POLYPOINT")).thenReturn(true)

        assertThrows<CustomerAlreadyExistsException> {
            customerService!!.createCustomer(CustomerTestData.customer2DTO)
        }
    }

    @Test
    fun shouldReturnListOfCustomers() {
        `when`(customerRepository!!.findAll()).thenReturn(listOf(CustomerTestData.customer, CustomerTestData.customer2))

        val expected = listOf(CustomerTestData.customerDTO, CustomerTestData.customer2DTO)
        val actual = customerService!!.getCustomers()

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldReturnAccessibleCustomersForSuperUser() {
        `when`(userService!!.getLoggedInUser()).thenReturn(UserTestData.userDTO)
        `when`(customerRepository!!.findAll()).thenReturn(listOf(CustomerTestData.customer, CustomerTestData.customer2))

        val expected = listOf(CustomerTestData.customerDTO, CustomerTestData.customer2DTO)
        val actual = customerService!!.getAccessibleCustomers()

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldReturnAccessibleCustomersForOrganizationAdministrator() {
        `when`(userService!!.getLoggedInUser()).thenReturn(UserTestData.userDTO2)
        `when`(customerRepository!!.findAllByUsersWithAccess(anyString())).thenReturn(listOf(CustomerTestData.customer, CustomerTestData.customer2))

        val expected = listOf(CustomerTestData.customerDTO, CustomerTestData.customer2DTO)
        val actual = customerService!!.getAccessibleCustomers()

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldReturnCustomerLogoById() {
        `when`(customerRepository!!.findById(eq(1L))).thenReturn(Optional.of(CustomerTestData.customer))

        val expected = ByteArray(100)
        val actual = customerService!!.getCustomerLogoByCustomerId(1L)

        Assert.assertEquals(expected.size, actual.size)
    }

    @Test
    fun shouldThrowCustomerNotFoundWhenFetchingLogoOfNonExistentCustomer() {
        `when`(customerRepository!!.findById(eq(1L))).thenReturn(Optional.empty())

        assertThrows<CustomerNotFoundException> {
            customerService!!.getCustomerLogoByCustomerId(1L)
        }
    }

    @Test
    fun shouldThrowForbiddenExceptionWhenUploadingCustomerLogoWithoutAccess() {
        `when`(userService!!.getLoggedInUser()).thenReturn(UserTestData.userDTO2)
        `when`(userService.isLoggedInUserSuperUser()).thenReturn(false)
        `when`(customerRepository!!.findById(eq(1L))).thenReturn(Optional.of(CustomerTestData.customer2))

        assertThrows<ForbiddenException> {
            customerService!!.uploadCustomerLogo(1L, ByteArray(100))
        }
    }

    @Test
    fun shouldUpdateCustomerById() {
        `when`(customerRepository!!.findById(eq(1L))).thenReturn(Optional.of(CustomerTestData.customer))
        `when`(userService!!.getLoggedInUser()).thenReturn(UserTestData.userDTO)
        `when`(userService.isLoggedInUserSuperUser()).thenReturn(true)

        val updatedCustomerDTO = CustomerTestData.customerDTO.copy(
                name = "New name",
                primaryColour = "#FFFAAA",
                accentColour = "#AAAFFF",
                usersWithAccess = emptySet()
        )

        val updatedCustomer = CustomerTestData.customer.copy(
                name = "New name",
                primaryColour = "#FFFAAA",
                accentColour = "#AAAFFF",
                usersWithAccess = emptySet()
        )

        `when`(customerRepository.save(eq(updatedCustomer))).thenReturn(updatedCustomer)

        val actual = customerService!!.updateCustomerById(1L, updatedCustomerDTO)

        Assert.assertEquals(updatedCustomerDTO, actual)
    }

    @Test
    fun shouldThrowForbiddenExceptionWhenUpdatingCustomerWithoutAccess() {
        `when`(customerRepository!!.findById(eq(1L))).thenReturn(Optional.of(CustomerTestData.customer2))
        `when`(userService!!.getLoggedInUser()).thenReturn(UserTestData.userDTO2)
        `when`(userService.isLoggedInUserSuperUser()).thenReturn(false)

        assertThrows<ForbiddenException> {
            customerService!!.updateCustomerById(1L, CustomerTestData.customerDTO)
        }
    }
}

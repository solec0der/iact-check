package ch.iact.iactcheck.service

import ch.iact.iactcheck.IactCheckApplication
import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.dto.CustomerDTO
import ch.iact.iactcheck.infrastructure.exception.CustomerAlreadyExistsException
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
                accentColour = "#AAAFFF",
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
    fun shouldReturnCustomerLogoById() {
        `when`(customerRepository!!.findById(eq(1L))).thenReturn(Optional.of(CustomerTestData.customer))

        val expected = ByteArray(100)
        val actual = customerService!!.getCustomerLogoByCustomerId(1L)

        Assert.assertEquals(expected.size, actual.size)
    }
}

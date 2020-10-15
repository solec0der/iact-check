package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.ShowLabCheckApplication
import ch.showlab.showlabcheck.domain.model.Customer
import ch.showlab.showlabcheck.domain.repository.CustomerRepository
import ch.showlab.showlabcheck.dto.CustomerDTO
import ch.showlab.showlabcheck.infrastructure.exception.CustomerAlreadyExistsException
import ch.showlab.showlabcheck.testdata.CustomerTestData
import ch.showlab.showlabcheck.testdata.UserTestData
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.boot.test.context.SpringBootTest
import java.util.*

@RunWith(MockitoJUnitRunner::class)
@SpringBootTest(classes = [ShowLabCheckApplication::class])
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
                accentColour = "#AAAFFF"
        )

        `when`(customerRepository!!.existsByName("EXPOFORMER")).thenReturn(false)
        `when`(customerRepository.save(any(Customer::class.java))).thenReturn(CustomerTestData.getCustomer())

        val expected = CustomerTestData.getCustomerDto()
        val actual = customerService!!.createCustomer(input)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowCustomerAlreadyExistsExceptionWhenCreatingExistingCustomer() {
        `when`(customerRepository!!.existsByName("POLYPOINT")).thenReturn(true)

        assertThrows<CustomerAlreadyExistsException> {
            customerService!!.createCustomer(CustomerTestData.getCustomer2Dto())
        }
    }

    @Test
    fun shouldReturnListOfCustomers() {
        `when`(customerRepository!!.findAll()).thenReturn(listOf(CustomerTestData.getCustomer(), CustomerTestData.getCustomer2()))

        val expected = listOf(CustomerTestData.getCustomerDto(), CustomerTestData.getCustomer2Dto())
        val actual = customerService!!.getCustomers()

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldReturnAccessibleCustomersForSuperUser() {
        `when`(userService!!.getLoggedInUser()).thenReturn(UserTestData.getUserDto())
        `when`(customerRepository!!.findAll()).thenReturn(listOf(CustomerTestData.getCustomer(), CustomerTestData.getCustomer2()))

        val expected = listOf(CustomerTestData.getCustomerDto(), CustomerTestData.getCustomer2Dto())
        val actual = customerService!!.getAccessibleCustomers()

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldReturnAccessibleCustomersForOrganizationAdministrator() {
        `when`(userService!!.getLoggedInUser()).thenReturn(UserTestData.getUser2Dto())
        `when`(customerRepository!!.findAllByUserId(eq(2L))).thenReturn(listOf(CustomerTestData.getCustomer2()))

        val expected = listOf(CustomerTestData.getCustomer2Dto())
        val actual = customerService!!.getAccessibleCustomers()

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldReturnCustomerLogoById() {
        `when`(customerRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(CustomerTestData.getCustomer()))

        val expected = ByteArray(100)
        val actual = customerService!!.getCustomerLogoByCustomerId(1L)

        Assert.assertEquals(expected.size, actual.size)
    }
}

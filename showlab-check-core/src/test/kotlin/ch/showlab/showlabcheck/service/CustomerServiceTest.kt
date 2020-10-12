package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.ShowLabCheckApplication
import ch.showlab.showlabcheck.domain.repository.CustomerRepository
import ch.showlab.showlabcheck.testdata.CustomerTestData
import ch.showlab.showlabcheck.testdata.UserTestData
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.junit.runner.RunWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.boot.test.context.SpringBootTest

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
}
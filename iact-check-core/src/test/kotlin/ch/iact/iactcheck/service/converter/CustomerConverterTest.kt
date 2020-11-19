package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.testdata.CustomerTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class CustomerConverterTest {

    @Test
    fun shouldReturnConvertedCustomerDTO() {
        val actual = CustomerConverter.convertCustomerToDTO(CustomerTestData.customer)

        Assert.assertEquals(CustomerTestData.customerDTO, actual)
    }
}

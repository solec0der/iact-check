package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.testdata.CustomerTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class CustomerConverterTest {

    @Test
    fun shouldReturnConvertedCustomerDTO() {
        val actual = CustomerConverter.convertCustomerToDTO(CustomerTestData.customer)

        Assert.assertEquals(CustomerTestData.customerDTO, actual)
    }
}

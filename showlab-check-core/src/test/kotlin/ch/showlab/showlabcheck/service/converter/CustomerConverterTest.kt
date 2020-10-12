package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.testdata.CustomerTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class CustomerConverterTest {

    @Test
    fun shouldReturnConvertedCustomerDto() {
        val actual = CustomerConverter.convertCustomerToDTO(CustomerTestData.getCustomer())

        Assert.assertEquals(CustomerTestData.getCustomerDto(), actual)
    }
}
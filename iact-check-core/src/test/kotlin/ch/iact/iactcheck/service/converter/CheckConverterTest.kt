package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.testdata.CheckTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class CheckConverterTest {

    @Test
    fun shouldReturnConvertedCheckDTO() {
        val actual = CheckConverter.convertCheckToDTO(CheckTestData.check)

        Assert.assertEquals(CheckTestData.checkDTO, actual)
    }
}

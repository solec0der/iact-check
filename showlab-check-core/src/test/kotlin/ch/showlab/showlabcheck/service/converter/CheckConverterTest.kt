package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.testdata.CheckTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class CheckConverterTest {

    @Test
    fun shouldReturnConvertedCheckDto() {
        val actual = CheckConverter.convertCheckToDTO(CheckTestData.check)

        Assert.assertEquals(CheckTestData.checkDto, actual)
    }
}

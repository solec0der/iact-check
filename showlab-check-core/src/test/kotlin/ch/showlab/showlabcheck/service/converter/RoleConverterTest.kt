package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.testdata.RoleTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class RoleConverterTest {

    @Test
    fun shouldReturnConvertedRoleDTO() {
        val actual = RoleConverter.convertRoleToDTO(RoleTestData.role)

        Assert.assertEquals(RoleTestData.roleDTO, actual)
    }
}

package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.testdata.RoleTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class RoleConverterTest {

    @Test
    fun shouldReturnConvertedRoleDto() {
        val actual = RoleConverter.convertRoleToDTO(RoleTestData.getRole())

        Assert.assertEquals(RoleTestData.getRoleDto(), actual)
    }
}

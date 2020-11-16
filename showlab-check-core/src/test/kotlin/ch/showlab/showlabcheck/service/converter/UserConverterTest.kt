package ch.showlab.showlabcheck.service.converter

import ch.showlab.showlabcheck.testdata.UserTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class UserConverterTest {

    @Test
    fun shouldReturnConvertedUserDTO() {
        val actual = UserConverter.convertUserToDTO(UserTestData.user)

        Assert.assertEquals(UserTestData.userDTO, actual)
    }
}

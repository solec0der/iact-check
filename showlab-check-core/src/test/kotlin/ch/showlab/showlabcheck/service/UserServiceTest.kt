package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.ShowLabCheckApplication
import ch.showlab.showlabcheck.domain.model.User
import ch.showlab.showlabcheck.domain.repository.RoleRepository
import ch.showlab.showlabcheck.domain.repository.UserRepository
import ch.showlab.showlabcheck.dto.RoleDTO
import ch.showlab.showlabcheck.dto.UserDTO
import ch.showlab.showlabcheck.infrastructure.exception.UserAlreadyExistsException
import ch.showlab.showlabcheck.testdata.RoleTestData
import ch.showlab.showlabcheck.testdata.UserTestData
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.Mockito.any
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.*

@RunWith(MockitoJUnitRunner::class)
@SpringBootTest(classes = [ShowLabCheckApplication::class])
class UserServiceTest {

    @InjectMocks
    private val userService: UserService? = null

    @Mock
    private val userRepository: UserRepository? = null

    @Mock
    private val roleRepository: RoleRepository? = null

    @Mock
    private val bCryptPasswordEncoder: BCryptPasswordEncoder? = null

    @Test
    fun shouldCreateUser() {
        val input = UserDTO(
                id = -1L,
                username = "superuser",
                password = "superuser",
                roles = setOf(RoleDTO(id = 1L, name = "SUPERUSER"))
        )

        `when`(roleRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(RoleTestData.getRole()))
        `when`(userRepository!!.existsByUsername("superuser")).thenReturn(false)
        `when`(userRepository.save(any(User::class.java))).thenReturn(UserTestData.getUser())
        `when`(bCryptPasswordEncoder!!.encode(ArgumentMatchers.eq("superuser"))).thenReturn("superuser")

        val actual = userService!!.createUser(input)

        Assert.assertEquals(UserTestData.getUserDto(), actual)
    }

    @Test
    fun shouldThrowUserAlreadyExistExcepion() {
        val input = UserDTO(
                id = -1L,
                username = "superuser",
                password = "superuser",
                roles = setOf(RoleDTO(id = 1L, name = "SUPERUSER"))
        )

        `when`(userRepository!!.existsByUsername("superuser")).thenReturn(true)

        assertThrows<UserAlreadyExistsException> {
            userService!!.createUser(input)
        }
    }
}

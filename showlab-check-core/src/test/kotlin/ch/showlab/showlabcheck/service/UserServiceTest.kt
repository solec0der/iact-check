package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.ShowLabCheckApplication
import ch.showlab.showlabcheck.domain.model.Role
import ch.showlab.showlabcheck.domain.model.User
import ch.showlab.showlabcheck.domain.repository.RoleRepository
import ch.showlab.showlabcheck.domain.repository.UserRepository
import ch.showlab.showlabcheck.dto.RoleDTO
import ch.showlab.showlabcheck.dto.UserDTO
import ch.showlab.showlabcheck.infrastructure.exception.UserAlreadyExistsException
import ch.showlab.showlabcheck.infrastructure.exception.UserNotFoundException
import ch.showlab.showlabcheck.testdata.RoleTestData
import ch.showlab.showlabcheck.testdata.UserTestData
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
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
    fun shouldThrowUserAlreadyExistException() {
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

    @Test
    fun shouldReturnListOfUsers() {
        `when`(userRepository!!.findAll()).thenReturn(listOf(UserTestData.getUser(), UserTestData.getUser2()))

        val expected = listOf(UserTestData.getUserDto(), UserTestData.getUser2Dto())
        val actual = userService!!.getUsers()

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldReturnUserById() {
        `when`(userRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(UserTestData.getUser()))

        val expected = UserTestData.getUserDto()
        val actual = userService!!.getUserById(1L)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowUserNotFoundExceptionWhenPassingInvalidId() {
        `when`(userRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<UserNotFoundException> {
            userService!!.getUserById(1L)
        }
    }

    @Test
    fun shouldUpdateUserAndReturnUpdatedUser() {
        val input = UserDTO(
                id = 0,
                username = "new-username",
                password = "new-password",
                roles = setOf(RoleDTO(id = 1L, name = "SUPERUSER"))
        )

        val updatedUser = User(
                id = 1L,
                username = "new-username",
                password = "new-password",
                roles = setOf(Role(id = 1L, name = "SUPERUSER"))
        )

        val expected = UserDTO(
                id = 1L,
                username = "new-username",
                roles = setOf(RoleDTO(id = 1L, name = "SUPERUSER"))
        )

        `when`(userRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(UserTestData.getUser()))
        `when`(roleRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(RoleTestData.getRole()))
        `when`(userRepository.save(any(User::class.java))).thenReturn(updatedUser)
        `when`(bCryptPasswordEncoder!!.encode(ArgumentMatchers.eq("new-password"))).thenReturn("new-password")

        val actual = userService!!.updateUserById(1L, input)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowUserNotFoundExceptionWhenUpdatingUserWithInvalidId() {
        `when`(userRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<UserNotFoundException> {
            userService!!.updateUserById(1L, UserTestData.getUserDto())
        }
    }
}

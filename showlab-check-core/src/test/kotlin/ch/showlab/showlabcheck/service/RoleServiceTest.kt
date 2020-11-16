package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.ShowLabCheckApplication
import ch.showlab.showlabcheck.domain.model.Role
import ch.showlab.showlabcheck.domain.repository.RoleRepository
import ch.showlab.showlabcheck.dto.RoleDTO
import ch.showlab.showlabcheck.infrastructure.exception.RoleAlreadyExistsException
import ch.showlab.showlabcheck.infrastructure.exception.RoleNotFoundException
import ch.showlab.showlabcheck.testdata.RoleTestData
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
import java.util.*

@RunWith(MockitoJUnitRunner::class)
@SpringBootTest(classes = [ShowLabCheckApplication::class])
class RoleServiceTest {

    @InjectMocks
    private val roleService: RoleService? = null

    @Mock
    private val roleRepository: RoleRepository? = null

    @Test
    fun shouldCreateRole() {
        val input = RoleDTO(
                id = -1L,
                name = "VIEWER"
        )

        `when`(roleRepository!!.save(any(Role::class.java))).thenReturn(RoleTestData.role)

        val expected = RoleTestData.roleDTO
        val actual = roleService!!.createRole(input)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowRoleAlreadyExistsException() {
        val input = RoleDTO(
                id = -1L,
                name = "VIEWER"
        )

        `when`(roleRepository!!.existsByName("VIEWER")).thenReturn(true)

        assertThrows<RoleAlreadyExistsException> {
            roleService!!.createRole(input)
        }
    }

    @Test
    fun shouldReturnListOfRoles() {
        `when`(roleRepository!!.findAll()).thenReturn(listOf(RoleTestData.role, RoleTestData.role2))

        val expected = listOf(RoleTestData.roleDTO, RoleTestData.role2DTO)
        val actual = roleService!!.getRoles()

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldReturnRoleById() {
        `when`(roleRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(RoleTestData.role))

        val expected = RoleTestData.roleDTO
        val actual = roleService!!.getRoleById(1L)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowRoleNotFoundExceptionWhenPassingInvalidId() {
        `when`(roleRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<RoleNotFoundException> {
            roleService!!.getRoleById(1L)
        }
    }

    @Test
    fun shouldUpdateRoleAndReturnUpdatedRole() {
        val input = RoleDTO(
                id = 0L,
                name = "NEW_ROLE"
        )

        val updatedRole = Role(
                id = 1L,
                name = "NEW_ROLE"
        )

        val expected = RoleDTO(
                id = 1L,
                name = "NEW_ROLE"
        )

        `when`(roleRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(RoleTestData.role))
        `when`(roleRepository.save(any(Role::class.java))).thenReturn(updatedRole)

        val actual = roleService!!.updateRoleById(1L, input)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowRoleNotFoundExceptionWhenUpdatingRoleWithInvalidId() {
        `when`(roleRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<RoleNotFoundException> {
            roleService!!.updateRoleById(1L, RoleTestData.roleDTO)
        }
    }
}

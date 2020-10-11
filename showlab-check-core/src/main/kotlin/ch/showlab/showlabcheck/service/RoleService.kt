package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.domain.model.Role
import ch.showlab.showlabcheck.domain.repository.RoleRepository
import ch.showlab.showlabcheck.dto.RoleDTO
import ch.showlab.showlabcheck.infrastructure.exception.RoleAlreadyExistsException
import ch.showlab.showlabcheck.infrastructure.exception.RoleNotFoundException
import ch.showlab.showlabcheck.service.converter.RoleConverter
import org.springframework.stereotype.Service

@Service
class RoleService(
        private val roleRepository: RoleRepository
) {

    fun createRole(roleDTO: RoleDTO): RoleDTO {
        if (roleRepository.existsByName(roleDTO.name)) {
            throw RoleAlreadyExistsException()
        }

        val role = Role(
                id = -1,
                name = roleDTO.name
        )

        return RoleConverter.convertRoleToDTO(roleRepository.save(role))
    }

    fun getRoles(): List<RoleDTO> {
        val roles = roleRepository.findAll()

        return roles
                .map { RoleConverter.convertRoleToDTO(it) }
                .toList()
    }

    fun getRoleById(roleId: Long): RoleDTO {
        val role = roleRepository.findById(roleId).orElseThrow { throw RoleNotFoundException() }

        return RoleConverter.convertRoleToDTO(role)
    }

    fun updateRoleById(roleId: Long, roleDTO: RoleDTO): RoleDTO {
        var role = roleRepository.findById(roleId).orElseThrow { throw RoleNotFoundException() }

        role = role.copy(name = roleDTO.name)

        return RoleConverter.convertRoleToDTO(roleRepository.save(role))
    }

    fun deleteRoleById(roleId: Long) {
        roleRepository.deleteById(roleId)
    }
}

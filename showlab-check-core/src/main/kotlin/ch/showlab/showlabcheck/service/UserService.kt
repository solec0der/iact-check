package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.domain.model.User
import ch.showlab.showlabcheck.domain.repository.RoleRepository
import ch.showlab.showlabcheck.domain.repository.UserRepository
import ch.showlab.showlabcheck.dto.UserDTO
import ch.showlab.showlabcheck.infrastructure.exception.RoleNotFoundException
import ch.showlab.showlabcheck.infrastructure.exception.UserAlreadyExistsException
import ch.showlab.showlabcheck.service.converter.UserConverter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
        private val userRepository: UserRepository,
        private val roleRepository: RoleRepository,
        private val bCryptPasswordEncoder: BCryptPasswordEncoder
) {

    fun createUser(userDTO: UserDTO): UserDTO {
        if (userRepository.existsByUsername(userDTO.username)) {
            throw UserAlreadyExistsException()
        }

        val user = User(
                id = -1,
                username = userDTO.username,
                password = bCryptPasswordEncoder.encode(userDTO.password),
                roles = userDTO.roles.map {
                    roleRepository.findById(it.id).orElseThrow { throw RoleNotFoundException() }
                }.toSet()
        )

        return UserConverter.convertUserToDTO(userRepository.save(user))
    }
}

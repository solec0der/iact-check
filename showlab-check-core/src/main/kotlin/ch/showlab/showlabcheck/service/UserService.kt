package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.domain.model.User
import ch.showlab.showlabcheck.domain.repository.CustomerRepository
import ch.showlab.showlabcheck.domain.repository.RoleRepository
import ch.showlab.showlabcheck.domain.repository.UserRepository
import ch.showlab.showlabcheck.dto.UserDTO
import ch.showlab.showlabcheck.infrastructure.exception.CustomerNotFoundException
import ch.showlab.showlabcheck.infrastructure.exception.RoleNotFoundException
import ch.showlab.showlabcheck.infrastructure.exception.UserAlreadyExistsException
import ch.showlab.showlabcheck.infrastructure.exception.UserNotFoundException
import ch.showlab.showlabcheck.service.converter.UserConverter
import com.auth0.jwt.interfaces.DecodedJWT
import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
        private val userRepository: UserRepository,
        private val roleRepository: RoleRepository,
        private val customerRepository: CustomerRepository,
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
                }.toSet(),
                accessibleCustomers = userDTO.accessibleCustomers.map {
                    customerRepository.findById(it.id).orElseThrow { throw CustomerNotFoundException() }
                }.toList()
        )

        return UserConverter.convertUserToDTO(userRepository.save(user))
    }

    fun getUsers(): List<UserDTO> {
        val users = userRepository.findAll()

        return users
                .map { UserConverter.convertUserToDTO(it) }
                .toList()
    }

    fun getUserById(userId: Long): UserDTO {
        val user = userRepository.findById(userId).orElseThrow { throw UserNotFoundException() }

        return UserConverter.convertUserToDTO(user)
    }

    fun getLoggedInUser(): UserDTO {
        val authentication = SecurityContextHolder.getContext().authentication

        val user = userRepository
                .findByUsername((authentication.principal as DecodedJWT).subject)
                .orElseThrow { throw UserNotFoundException() }

        return UserConverter.convertUserToDTO(user)
    }

    fun updateUserById(userId: Long, userDTO: UserDTO): UserDTO {
        var user = userRepository.findById(userId).orElseThrow { throw UserNotFoundException() }

        user = user.copy(
                username = userDTO.username,
                password = bCryptPasswordEncoder.encode(userDTO.password),
                roles = userDTO.roles.map {
                    roleRepository.findById(it.id).orElseThrow { throw RoleNotFoundException() }
                }.toSet(),
                accessibleCustomers = userDTO.accessibleCustomers.map {
                    customerRepository.findById(it.id).orElseThrow { throw CustomerNotFoundException() }
                }.toList()
        )

        return UserConverter.convertUserToDTO(userRepository.save(user))
    }

    fun deleteUserById(userId: Long) {
        userRepository.deleteById(userId)
    }
}

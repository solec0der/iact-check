package ch.showlab.showlabcheck.config.security

import ch.showlab.showlabcheck.domain.repository.UserRepository
import ch.showlab.showlabcheck.infrastructure.exception.UserNotFoundException
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(
        private val userRepository: UserRepository
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username).orElseThrow { throw UserNotFoundException() }

        return User(user.username, user.password, SecurityUtil.convertSetOfRolesToGrantedAuthorities(user.roles))
    }
}

package ch.showlab.showlabcheck.config.security.filter

import ch.showlab.showlabcheck.config.security.LoginRequest
import ch.showlab.showlabcheck.config.security.SecurityConstants
import ch.showlab.showlabcheck.config.security.SecurityUtil
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthenticationFilter(
        private val objectMapper: ObjectMapper,
        private val authManager: AuthenticationManager
) : UsernamePasswordAuthenticationFilter() {

    override fun attemptAuthentication(
            request: HttpServletRequest,
            response: HttpServletResponse
    ): Authentication {

        val loginRequest = objectMapper.readValue(request.inputStream, LoginRequest::class.java)

        return authManager.authenticate(
                UsernamePasswordAuthenticationToken(
                        loginRequest.username,
                        loginRequest.password,
                        emptyList()
                )
        )
    }

    override fun successfulAuthentication(
            request: HttpServletRequest,
            response: HttpServletResponse,
            chain: FilterChain,
            authResult: Authentication
    ) {
        val user = (authResult.principal as User)
        val roles = SecurityUtil.convertGrantedAuthoritiesToRolesArray(user.authorities)

        val token = JWT.create()
                .withSubject(user.username)
                .withArrayClaim("roles", roles)
                .withExpiresAt(Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.toByteArray()))

        response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token)
    }
}

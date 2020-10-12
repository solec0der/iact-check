package ch.showlab.showlabcheck.config.security.filter

import ch.showlab.showlabcheck.config.security.SecurityConstants
import ch.showlab.showlabcheck.config.security.SecurityUtil
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JWTAuthorizationFilter(
        val authManager: AuthenticationManager
) : BasicAuthenticationFilter(authManager) {

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val header = request.getHeader(SecurityConstants.HEADER_STRING)

        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(request, response)
            return
        }

        val authentication = getAuthentication(request)

        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(request, response)
    }

    private fun getAuthentication(request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        val token = request.getHeader(SecurityConstants.HEADER_STRING)

        if (token != null) {
            val user = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET.toByteArray()))
                    .build()
                    .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))

            if (user.subject != null) {
                val grantedAuthorities = SecurityUtil.convertArrayOfRolesToGrantedAuthorities(user.getClaim("roles").asArray(String::class.java))

                return UsernamePasswordAuthenticationToken(user, null, grantedAuthorities)
            }
            return null
        }
        return null
    }
}

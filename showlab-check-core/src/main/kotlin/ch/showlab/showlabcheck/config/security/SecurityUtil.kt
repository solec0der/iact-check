package ch.showlab.showlabcheck.config.security

import ch.showlab.showlabcheck.domain.model.Role
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority

object SecurityUtil {

    fun convertGrantedAuthoritiesToRolesArray(grantedAuthorities: Collection<GrantedAuthority>): Array<String> {
        return grantedAuthorities.map { it.authority }.toTypedArray()
    }

    fun convertSetOfRolesToGrantedAuthorities(roles: Set<Role>): Collection<GrantedAuthority> {
        val grantedAuthorities = ArrayList<GrantedAuthority>()

        roles.forEach {
            grantedAuthorities.add(SimpleGrantedAuthority(it.name))
        }

        return grantedAuthorities
    }

    fun convertArrayOfRolesToGrantedAuthorities(roles: Array<String>): Collection<GrantedAuthority> {
        val grantedAuthorities = ArrayList<GrantedAuthority>()

        roles.forEach {
            grantedAuthorities.add(SimpleGrantedAuthority("ROLE_$it"))
        }

        return grantedAuthorities
    }
}

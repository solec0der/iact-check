package ch.showlab.showlabcheck.infrastructure.admin

import ch.showlab.showlabcheck.dto.RoleDTO
import ch.showlab.showlabcheck.service.RoleService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.annotation.security.RolesAllowed

@RestController
@RolesAllowed("SUPERUSER")
@RequestMapping("/api/admin/roles")
class RoleAdminController(
        private val roleService: RoleService
) {

    @GetMapping
    fun getRoles(): List<RoleDTO> {
        return roleService.getRoles()
    }
}

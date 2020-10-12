package ch.showlab.showlabcheck.infrastructure.admin

import ch.showlab.showlabcheck.dto.RoleDTO
import ch.showlab.showlabcheck.dto.UserDTO
import ch.showlab.showlabcheck.service.RoleService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.ExampleObject
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.springframework.http.MediaType
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
    @Operation(
            summary = "getRoles",
            description = "Returns a list of all roles",
            tags = ["role"]
    )
    @ApiResponses(
            value = [
                ApiResponse(responseCode = "200",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = Schema(implementation = RoleDTO::class),
                                    examples = [
                                        ExampleObject(
                                                name = "200 OK Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/role/get_roles_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun getRoles(): List<RoleDTO> {
        return roleService.getRoles()
    }
}

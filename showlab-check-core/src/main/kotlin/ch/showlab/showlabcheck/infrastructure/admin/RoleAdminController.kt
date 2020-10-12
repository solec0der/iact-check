package ch.showlab.showlabcheck.infrastructure.admin

import ch.showlab.showlabcheck.dto.RoleDTO
import ch.showlab.showlabcheck.service.RoleService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.ExampleObject
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import javax.annotation.security.RolesAllowed

@RestController
@RolesAllowed("SUPERUSER")
@RequestMapping("/api/admin/roles")
class RoleAdminController(
        private val roleService: RoleService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "createRole",
            description = "Creates a role",
            tags = ["role"]
    )
    @ApiResponses(
            value = [
                ApiResponse(responseCode = "201",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = Schema(implementation = RoleDTO::class),
                                    examples = [
                                        ExampleObject(
                                                name = "201 Created Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/role/create_role_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun createRole(@RequestBody roleDTO: RoleDTO): RoleDTO {
        return roleService.createRole(roleDTO)
    }

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

    @GetMapping("/{roleId}")
    @Operation(
            summary = "getRoleById",
            description = "Returns a single role by id. If the role can't be found, a 404 Not Found will be thrown.",
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
                ),
                ApiResponse(responseCode = "4xx",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    examples = [
                                        ExampleObject(
                                                name = "404 Not Found Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/role/role_not_found_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun getRoleById(@PathVariable("roleId") roleId: Long): RoleDTO {
        return roleService.getRoleById(roleId)
    }

    @PutMapping("/{roleId}")
    @Operation(
            summary = "updateRoleById",
            description = "Updates the fields of a role",
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
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/role/update_role_by_id_response.txt")
                                    ]
                            )
                        ]
                ),
                ApiResponse(responseCode = "4xx",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    examples = [
                                        ExampleObject(
                                                name = "404 Not Found Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/role/role_not_found_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun updateRoleById(@PathVariable("roleId") roleId: Long, @RequestBody roleDTO: RoleDTO): RoleDTO {
        return roleService.updateRoleById(roleId, roleDTO)
    }

    @DeleteMapping("/{roleId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            summary = "deleteRoleById",
            description = "Deletes role by id",
            tags = ["role"]
    )
    fun deleteRoleById(@PathVariable("roleId") roleId: Long) {
        roleService.deleteRoleById(roleId)
    }
}

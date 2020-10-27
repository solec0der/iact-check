package ch.showlab.showlabcheck.infrastructure.admin

import ch.showlab.showlabcheck.dto.UserDTO
import ch.showlab.showlabcheck.service.UserService
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
@RequestMapping("/api/admin/users")
internal class UserAdminController(
        private val userService: UserService
) {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "createUser",
            description = "Creates a user with a username, a password which is hashed " +
                    "using the bcrypt algorithm and a set of roles.",
            tags = ["user"]
    )
    @ApiResponses(
            value = [
                ApiResponse(responseCode = "201",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = Schema(implementation = UserDTO::class),
                                    examples = [
                                        ExampleObject(
                                                name = "201 Created Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/user/create_user_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun createUser(@RequestBody userDTO: UserDTO): UserDTO {
        return userService.createUser(userDTO)
    }

    @GetMapping
    @Operation(
            summary = "getUsers",
            description = "Returns a list of all users including their roles",
            tags = ["user"]
    )
    @ApiResponses(
            value = [
                ApiResponse(responseCode = "200",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = Schema(implementation = UserDTO::class),
                                    examples = [
                                        ExampleObject(
                                                name = "200 OK Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/user/get_users_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun getUsers(): List<UserDTO> {
        return userService.getUsers()
    }

    @GetMapping("/{userId}")
    @Operation(
            summary = "getUserById",
            description = "Returns a single user by user id. If the user can't be found, a 404 Not Found will be thrown.",
            tags = ["user"]
    )
    @ApiResponses(
            value = [
                ApiResponse(responseCode = "200",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = Schema(implementation = UserDTO::class),
                                    examples = [
                                        ExampleObject(
                                                name = "200 OK Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/user/get_users_response.txt")
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
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/user/user_not_found_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun getUserById(@PathVariable("userId") userId: Long): UserDTO {
        return userService.getUserById(userId)
    }

    @PutMapping("/{userId}")
    @Operation(
            summary = "updateUserById",
            description = "Updates the fields of a user.",
            tags = ["user"]
    )
    @ApiResponses(
            value = [
                ApiResponse(responseCode = "200",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = Schema(implementation = UserDTO::class),
                                    examples = [
                                        ExampleObject(
                                                name = "200 OK Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/user/update_user_by_id_response.txt")
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
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/user/user_not_found_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun updateUserById(@PathVariable("userId") userId: Long, @RequestBody userDTO: UserDTO): UserDTO {
        return userService.updateUserById(userId, userDTO)
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            summary = "deleteUserById",
            description = "Deletes a user by id",
            tags = ["user"]
    )
    fun deleteUserById(@PathVariable("userId") userId: Long) {
        userService.deleteUserById(userId)
    }
}

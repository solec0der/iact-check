package ch.showlab.showlabcheck.dto

import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
data class UserDTO(
        val id: Long,
        val username: String,
        val password: String? = null,
        val roles: Set<RoleDTO>
)

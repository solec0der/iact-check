package ch.iact.iactcheck.dto

data class UserDTO(
    val userId: String,
    val preferredUsername: String,
    val email: String,
    val roles: Set<String>
)

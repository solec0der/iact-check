package ch.iact.iactcheck.dto

data class CustomerDTO(
        val id: Long,
        val name: String,
        val primaryColour: String,
        val accentColour: String,
        val usersWithAccess: Set<String>
)

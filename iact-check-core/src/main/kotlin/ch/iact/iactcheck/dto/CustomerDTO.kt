package ch.iact.iactcheck.dto

data class CustomerDTO(
        val id: Long,
        val name: String,
        val primaryColour: String,
        val backgroundColour: String,
        val accentColour: String,
        val textColour: String,
        val font: String,
        val usersWithAccess: Set<String>
)

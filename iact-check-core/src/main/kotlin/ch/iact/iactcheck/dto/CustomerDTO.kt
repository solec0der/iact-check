package ch.iact.iactcheck.dto

data class CustomerDTO(
    val id: Long,
    val name: String,
    val customerBranding: CustomerBrandingDTO? = null,
    val usersWithAccess: Set<String>
)

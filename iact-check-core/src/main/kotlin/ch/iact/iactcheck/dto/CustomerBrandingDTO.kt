package ch.iact.iactcheck.dto

data class CustomerBrandingDTO(
    val id: Long,
    val customerId: Long,
    val primaryColour: String,
    val backgroundColour: String,
    val accentColour: String,
    val textColour: String,
    val font: String,
    val theme: String
)

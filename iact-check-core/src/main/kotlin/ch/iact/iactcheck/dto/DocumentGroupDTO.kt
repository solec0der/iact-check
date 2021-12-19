package ch.iact.iactcheck.dto

data class DocumentGroupDTO(
    val id: Long,
    val checkId: Long,
    val name: String,
    val backgroundColour: String? = null,
    val documents: List<DocumentDTO>
)

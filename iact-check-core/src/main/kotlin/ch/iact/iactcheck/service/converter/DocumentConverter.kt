package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.Document
import ch.iact.iactcheck.domain.model.DocumentGroup
import ch.iact.iactcheck.dto.DocumentDTO
import ch.iact.iactcheck.dto.DocumentGroupDTO

object DocumentConverter {

    fun map(documentGroup: DocumentGroup): DocumentGroupDTO {
        return DocumentGroupDTO(
            id = documentGroup.id,
            checkId = documentGroup.check.id,
            name = documentGroup.name,
            backgroundColour = documentGroup.backgroundColour,
            documents = documentGroup.documents.map(DocumentConverter::map).sortedBy { it.position }
        )
    }

    fun map(document: Document): DocumentDTO {
        return DocumentDTO(
            id = document.id,
            title = document.title,
            position = document.position,
            mediaType = document.mediaType
        )
    }
}

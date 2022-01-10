package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.CheckNotFoundException
import ch.iact.iactcheck.controller.exception.DocumentFileNotFoundException
import ch.iact.iactcheck.controller.exception.DocumentGroupNotFoundException
import ch.iact.iactcheck.controller.exception.DocumentNotFoundException
import ch.iact.iactcheck.domain.model.Document
import ch.iact.iactcheck.domain.model.DocumentFile
import ch.iact.iactcheck.domain.model.DocumentGroup
import ch.iact.iactcheck.domain.repository.CheckRepository
import ch.iact.iactcheck.domain.repository.DocumentFileRepository
import ch.iact.iactcheck.domain.repository.DocumentGroupRepository
import ch.iact.iactcheck.domain.repository.DocumentRepository
import ch.iact.iactcheck.dto.DocumentDTO
import ch.iact.iactcheck.dto.DocumentGroupDTO
import ch.iact.iactcheck.service.converter.DocumentConverter
import org.springframework.http.MediaType
import org.springframework.stereotype.Service

@Service
class DocumentService(
    private val documentGroupRepository: DocumentGroupRepository,
    private val documentFileRepository: DocumentFileRepository,
    private val documentRepository: DocumentRepository,
    private val checkRepository: CheckRepository
) {

    fun createDocumentGroup(documentGroupDTO: DocumentGroupDTO): DocumentGroupDTO {
        val check = checkRepository
            .findById(documentGroupDTO.checkId)
            .orElseThrow { throw CheckNotFoundException() }

        val documentGroup = DocumentGroup(
            id = -1,
            name = documentGroupDTO.name,
            backgroundColour = documentGroupDTO.backgroundColour,
            check = check,
            documents = ArrayList()
        )
        return DocumentConverter.map(documentGroupRepository.save(documentGroup))
    }

    fun createDocumentForDocumentGroup(documentGroupId: Long, documentDTO: DocumentDTO): DocumentDTO {
        val documentGroup = documentGroupRepository
            .findById(documentGroupId)
            .orElseThrow { throw DocumentGroupNotFoundException() }

        val document = Document(
            id = -1,
            title = documentDTO.title,
            position = documentGroup.documents.size,
            mediaType = documentDTO.mediaType,
            documentGroup = documentGroup
        )

        return DocumentConverter.map(documentRepository.save(document))
    }

    fun getDocumentGroupById(documentGroupId: Long): DocumentGroupDTO {
        return DocumentConverter.map(
            documentGroupRepository
                .findById(documentGroupId)
                .orElseThrow { throw DocumentGroupNotFoundException() }
        )
    }

    fun getDocumentById(documentId: Long): DocumentDTO {
        return DocumentConverter.map(
            documentRepository
                .findById(documentId)
                .orElseThrow { throw DocumentNotFoundException() }
        )
    }

    fun getFileByDocumentId(documentId: Long): Pair<MediaType, ByteArray> {
        val documentFile = documentFileRepository
            .findById(documentId)
            .orElseThrow { throw DocumentFileNotFoundException() }

        return Pair(MediaType.valueOf(documentFile.document.mediaType), documentFile.file)
    }

    fun getDocumentGroupsByCheckId(checkId: Long): List<DocumentGroupDTO> {
        return documentGroupRepository
            .findAllByCheckId(checkId)
            .map(DocumentConverter::map)
    }

    fun uploadFileForDocument(documentId: Long, file: ByteArray) {
        val documentFile = if (documentFileRepository.existsById(documentId)) {
            documentFileRepository
                .findById(documentId)
                .orElseThrow { throw DocumentFileNotFoundException() }
                .copy(file = file)
        } else {
            val document = documentRepository
                .findById(documentId)
                .orElseThrow { throw DocumentNotFoundException() }

            DocumentFile(file = file, document = document)
        }

        documentFileRepository.save(documentFile)
    }

    fun updateDocumentGroupById(documentGroupId: Long, documentGroupDTO: DocumentGroupDTO): DocumentGroupDTO {
        var documentGroup = documentGroupRepository
            .findById(documentGroupId)
            .orElseThrow { throw DocumentGroupNotFoundException() }

        documentGroup = documentGroup.copy(
            name = documentGroupDTO.name,
            backgroundColour = documentGroupDTO.backgroundColour,
        )

        return DocumentConverter.map(documentGroupRepository.save(documentGroup))
    }

    fun updateDocuments(documents: List<DocumentDTO>): List<DocumentDTO> {
        return documents.map { updateDocumentById(it.id, it) }
    }

    fun updateDocumentById(documentId: Long, documentDTO: DocumentDTO): DocumentDTO {
        val document = documentRepository
            .findById(documentId)
            .orElseThrow { throw DocumentNotFoundException() }
            .copy(
                title = documentDTO.title,
                mediaType = documentDTO.mediaType,
                position = documentDTO.position
            )

        return DocumentConverter.map(documentRepository.save(document))
    }

    fun deleteDocumentGroupById(documentGroupId: Long) {
        val documentsGroup = getDocumentGroupById(documentGroupId)
        documentsGroup.documents.map(DocumentDTO::id).forEach(this::deleteDocumentById)
        documentGroupRepository.deleteById(documentGroupId)
    }

    fun deleteDocumentById(documentId: Long) {
        documentFileRepository.deleteById(documentId)
        documentRepository.deleteById(documentId)
    }
}

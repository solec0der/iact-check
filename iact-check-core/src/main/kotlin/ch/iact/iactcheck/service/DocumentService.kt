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

        var documentGroup = DocumentGroup(
            id = -1,
            name = documentGroupDTO.name,
            backgroundColour = documentGroupDTO.backgroundColour,
            check = check,
            documents = ArrayList()
        )
        documentGroup = documentGroupRepository.save(documentGroup)
        documentGroup = documentGroup.copy(
            documents = documentGroupDTO.documents.map {
                Document(
                    id = -1,
                    title = it.title,
                    mediaType = it.mediaType,
                    documentGroup = documentGroup
                )
            }
        )

        return DocumentConverter.map(documentGroupRepository.save(documentGroup))
    }

    fun getDocumentGroupById(documentGroupId: Long): DocumentGroupDTO {
        return DocumentConverter.map(
            documentGroupRepository
                .findById(documentGroupId)
                .orElseThrow { throw DocumentGroupNotFoundException() }
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
        val document = documentRepository
            .findById(documentId)
            .orElseThrow { throw DocumentNotFoundException() }

        val documentFile = DocumentFile(documentId, file, document)
        documentFileRepository.save(documentFile)
    }

    fun updateDocumentGroupById(documentGroupId: Long, documentGroupDTO: DocumentGroupDTO): DocumentGroupDTO {
        var documentGroup = documentGroupRepository
            .findById(documentGroupId)
            .orElseThrow { throw DocumentGroupNotFoundException() }

        documentGroup = documentGroup.copy(
            name = documentGroupDTO.name,
            backgroundColour = documentGroupDTO.backgroundColour,
            documents = updateDocuments(documentGroup, documentGroupDTO.documents)
        )

        return DocumentConverter.map(documentGroupRepository.save(documentGroup))
    }

    private fun updateDocuments(
        documentGroup: DocumentGroup,
        documentsDTO: List<DocumentDTO>
    ): List<Document> {
        return documentsDTO.map {
            documentGroup.documents.find { document -> document.id == it.id }?.copy(
                title = it.title,
                mediaType = it.mediaType
            )
                ?: Document(
                    id = -1,
                    title = it.title,
                    mediaType = it.mediaType,
                    documentGroup = documentGroup
                )
        }
    }

    fun deleteDocumentGroupById(documentGroupId: Long) {
        documentGroupRepository.deleteById(documentGroupId)
    }
}

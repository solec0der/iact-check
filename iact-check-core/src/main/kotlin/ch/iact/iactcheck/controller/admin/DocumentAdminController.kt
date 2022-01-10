package ch.iact.iactcheck.controller.admin

import ch.iact.iactcheck.dto.DocumentDTO
import ch.iact.iactcheck.dto.DocumentGroupDTO
import ch.iact.iactcheck.service.DocumentService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/admin")
internal class DocumentAdminController(private val documentService: DocumentService) {

    @PostMapping("/document-groups")
    @ResponseStatus(HttpStatus.CREATED)
    fun createDocumentGroup(@RequestBody documentGroup: DocumentGroupDTO): DocumentGroupDTO {
        return documentService.createDocumentGroup(documentGroup)
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/document-groups/{documentGroupId}/documents")
    fun createDocumentForDocumentGroup(
        @PathVariable("documentGroupId") documentGroupId: Long,
        @RequestBody documentDTO: DocumentDTO
    ): DocumentDTO {
        return documentService.createDocumentForDocumentGroup(documentGroupId, documentDTO)
    }

    @GetMapping("/document-groups/documents/{documentId}")
    fun getDocumentById(@PathVariable("documentId") documentId: Long): DocumentDTO {
        return documentService.getDocumentById(documentId)
    }

    @PutMapping("/document-groups/{documentGroupIdId}")
    fun updateDocumentGroupById(
        @PathVariable("documentGroupIdId") documentGroupId: Long,
        @RequestBody documentGroup: DocumentGroupDTO
    ): DocumentGroupDTO {
        return documentService.updateDocumentGroupById(documentGroupId, documentGroup)
    }

    @PutMapping("/document-groups/documents/{documentId}")
    fun updateDocumentById(
        @PathVariable("documentId") documentId: Long,
        @RequestBody documentDTO: DocumentDTO
    ): DocumentDTO {
        return documentService.updateDocumentById(documentId, documentDTO)
    }

    @PutMapping("/document-groups/documents")
    fun updateDocuments(@RequestBody documents: List<DocumentDTO>): List<DocumentDTO> {
        return documentService.updateDocuments(documents)
    }

    @PutMapping("/document-groups/documents/{documentId}/assets")
    fun uploadFileForDocument(
        @PathVariable("documentId") documentId: Long,
        @RequestParam("file") file: MultipartFile
    ) {
        documentService.uploadFileForDocument(documentId, file.bytes)
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/document-groups/{documentGroupIdId}")
    fun deleteDocumentGroupById(@PathVariable("documentGroupIdId") documentGroupId: Long) {
        documentService.deleteDocumentGroupById(documentGroupId)
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/document-groups/documents/{documentId}")
    fun deleteDocumentById(@PathVariable("documentId") documentId: Long) {
        documentService.deleteDocumentById(documentId)
    }
}

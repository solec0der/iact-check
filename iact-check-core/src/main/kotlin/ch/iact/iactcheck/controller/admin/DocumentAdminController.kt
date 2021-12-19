package ch.iact.iactcheck.controller.admin

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

    @GetMapping("/document-groups/{documentGroupIdId}")
    fun getDocumentGroupById(@PathVariable("documentGroupIdId") documentGroupId: Long): DocumentGroupDTO {
        return documentService.getDocumentGroupById(documentGroupId)
    }

    @PutMapping("/document-groups/{documentGroupIdId}")
    fun updateDocumentGroupById(
        @PathVariable("documentGroupIdId") documentGroupId: Long,
        @RequestBody documentGroup: DocumentGroupDTO
    ): DocumentGroupDTO {
        return documentService.updateDocumentGroupById(documentGroupId, documentGroup)
    }

    @PutMapping("/documents/{documentId}/assets")
    fun uploadImageForImageAnswer(
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
}

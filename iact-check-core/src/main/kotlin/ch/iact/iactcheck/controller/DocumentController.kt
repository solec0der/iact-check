package ch.iact.iactcheck.controller

import ch.iact.iactcheck.dto.DocumentGroupDTO
import ch.iact.iactcheck.service.DocumentService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
internal class DocumentController(private val documentService: DocumentService) {

    @GetMapping("/document-groups/{documentGroupIdId}")
    fun getDocumentGroupById(@PathVariable("documentGroupIdId") documentGroupId: Long): DocumentGroupDTO {
        return documentService.getDocumentGroupById(documentGroupId)
    }

    @GetMapping("/checks/{checkId}/document-groups")
    fun getDocumentGroupsByCheckId(@PathVariable("checkId") checkId: Long): List<DocumentGroupDTO> {
        return documentService.getDocumentGroupsByCheckId(checkId)
    }

    @GetMapping("/documents/{documentId}/file")
    fun getFileByDocumentId(@PathVariable("documentId") documentId: Long): ResponseEntity<ByteArray> {
        val (mediaType, file) = documentService.getFileByDocumentId(documentId)

        return ResponseEntity.ok()
            .contentType(mediaType)
            .body(file)
    }
}

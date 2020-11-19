package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.QuestionCategoryDTO
import ch.iact.iactcheck.service.QuestionCategoryService
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/admin/question-categories")
internal class QuestionCategoryAdminController(
        private val questionCategoryService: QuestionCategoryService
) {

    @PostMapping
    fun createQuestionCategory(@RequestBody questionCategoryDTO: QuestionCategoryDTO): QuestionCategoryDTO {
        return questionCategoryService.createQuestionCategory(questionCategoryDTO)
    }

    @PutMapping("/{questionCategoryId}/thumbnail")
    fun uploadThumbnailForQuestionCategory(
            @PathVariable("questionCategoryId") questionCategoryId: Long,
            @RequestParam("thumbnail") file: MultipartFile
    ) {
        questionCategoryService.uploadThumbnailForQuestionCategory(questionCategoryId, file.bytes)
    }

    @PutMapping("/{questionCategoryId}")
    fun updateQuestionCategoryById(
            @PathVariable("questionCategoryId") questionCategoryId: Long,
            @RequestBody questionCategoryDTO: QuestionCategoryDTO
    ): QuestionCategoryDTO {
        return questionCategoryService.updateQuestionCategoryById(questionCategoryId, questionCategoryDTO)
    }

    @DeleteMapping("/{questionCategoryId}")
    fun deleteQuestionCategoryById(@PathVariable("questionCategoryId") questionCategoryId: Long) {
        questionCategoryService.deleteQuestionCategoryById(questionCategoryId)
    }
}

package ch.iact.iactcheck.controller.admin

import ch.iact.iactcheck.dto.QuestionCategoryDTO
import ch.iact.iactcheck.service.QuestionCategoryService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/admin/question-categories")
internal class QuestionCategoryAdminController(
    private val questionCategoryService: QuestionCategoryService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createQuestionCategory(@RequestBody questionCategoryDTO: QuestionCategoryDTO): QuestionCategoryDTO {
        return questionCategoryService.createQuestionCategory(questionCategoryDTO)
    }

    @GetMapping("/{questionCategoryId}")
    fun getQuestionCategoryById(@PathVariable("questionCategoryId") questionCategoryId: Long): QuestionCategoryDTO {
        return questionCategoryService.getQuestionCategoryById(questionCategoryId)
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

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{questionCategoryId}")
    fun deleteQuestionCategoryById(@PathVariable("questionCategoryId") questionCategoryId: Long) {
        questionCategoryService.deleteQuestionCategoryById(questionCategoryId)
    }
}

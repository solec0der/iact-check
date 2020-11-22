package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.QuestionDTO
import ch.iact.iactcheck.service.QuestionService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/admin/questions")
internal class QuestionAdminController(
        private val questionService: QuestionService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createQuestion(@RequestBody questionDTO: QuestionDTO): QuestionDTO {
        return questionService.createQuestion(questionDTO)
    }

    @PutMapping("/{questionId}")
    fun updateQuestionById(
            @PathVariable("questionId") questionId: Long,
            @RequestBody questionDTO: QuestionDTO
    ): QuestionDTO {
        return questionService.updateQuestionById(questionId, questionDTO)
    }

    @PutMapping("/{questionId}/icon")
    fun uploadIconForQuestion(
            @PathVariable("questionId") questionId: Long,
            @RequestParam("icon") file: MultipartFile
    ) {
        questionService.uploadIconForQuestion(questionId, file.bytes)
    }

    @DeleteMapping("/{questionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteQuestionById(@PathVariable("questionId") questionId: Long) {
        questionService.deleteQuestionById(questionId)
    }
}
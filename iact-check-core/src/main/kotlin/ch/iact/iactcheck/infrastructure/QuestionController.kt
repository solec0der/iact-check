package ch.iact.iactcheck.infrastructure

import ch.iact.iactcheck.service.QuestionService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/questions")
internal class QuestionController(
        private val questionService: QuestionService
) {

    @GetMapping("/{questionId}/icon", produces = [MediaType.IMAGE_PNG_VALUE])
    fun getIconByQuestionId(@PathVariable("questionId") questionId: Long): ByteArray {
        return questionService.getIconByQuestionId(questionId)
    }
}
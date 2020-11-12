package ch.showlab.showlabcheck.infrastructure

import ch.showlab.showlabcheck.service.QuestionCategoryService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/question-categories")
internal class QuestionCategoryController(
        private val questionCategoryService: QuestionCategoryService
) {

    @GetMapping("/{questionCategoryId}/thumbnail")
    fun getThumbnailByQuestionCategoryId(@PathVariable("questionCategoryId") questionCategoryId: Long): ByteArray {
        return questionCategoryService.getThumbnailByQuestionCategoryId(questionCategoryId)
    }
}

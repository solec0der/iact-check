package ch.iact.iactcheck.infrastructure

import ch.iact.iactcheck.service.RangeQuestionService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/range-questions")
internal class RangeQuestionController(
    private val rangeQuestionService: RangeQuestionService
) {

    @GetMapping("/{rangeQuestionId}/icon", produces = [MediaType.IMAGE_PNG_VALUE])
    fun getIconByQuestionId(@PathVariable("rangeQuestionId") rangeQuestionId: Long): ByteArray {
        return rangeQuestionService.getIconByRangeQuestionId(rangeQuestionId)
    }
}

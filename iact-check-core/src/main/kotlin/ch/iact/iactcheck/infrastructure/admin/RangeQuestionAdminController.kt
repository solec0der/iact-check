package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.RangeQuestionDTO
import ch.iact.iactcheck.service.RangeQuestionService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/admin/range-questions")
internal class RangeQuestionAdminController(
        private val rangeQuestionService: RangeQuestionService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createRangeQuestion(@RequestBody rangeQuestionDTO: RangeQuestionDTO): RangeQuestionDTO {
        return rangeQuestionService.createRangeQuestion(rangeQuestionDTO)
    }

    @PutMapping("/{rangeQuestionId}")
    fun updateRangeQuestionById(
            @PathVariable("rangeQuestionId") questionId: Long,
            @RequestBody rangeQuestionDTO: RangeQuestionDTO
    ): RangeQuestionDTO {
        return rangeQuestionService.updateQuestionById(questionId, rangeQuestionDTO)
    }

    @PutMapping("/{rangeQuestionId}/icon")
    fun uploadIconForRangeQuestion(
            @PathVariable("rangeQuestionId") questionId: Long,
            @RequestParam("icon") file: MultipartFile
    ) {
        rangeQuestionService.uploadIconForQuestion(questionId, file.bytes)
    }

    @DeleteMapping("/{rangeQuestionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteRangeQuestionById(@PathVariable("rangeQuestionId") questionId: Long) {
        rangeQuestionService.deleteQuestionById(questionId)
    }
}

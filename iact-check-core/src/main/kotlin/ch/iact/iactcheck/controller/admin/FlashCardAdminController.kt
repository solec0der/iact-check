package ch.iact.iactcheck.controller.admin

import ch.iact.iactcheck.dto.FlashCardQuestionDTO
import ch.iact.iactcheck.service.FlashCardService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/flash-card-questions")
internal class FlashCardAdminController(private val flashCardService: FlashCardService) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createFlashCardQuestion(@RequestBody flashCardQuestionDTO: FlashCardQuestionDTO): FlashCardQuestionDTO {
        return flashCardService.createFlashCardQuestion(flashCardQuestionDTO)
    }

    @GetMapping("/{flashCardQuestionId}")
    fun getFlashCardQuestionById(@PathVariable("flashCardQuestionId") flashCardQuestionId: Long): FlashCardQuestionDTO {
        return flashCardService.getFlashCardQuestionById(flashCardQuestionId)
    }

    @PutMapping("/{flashCardQuestionId}")
    fun updateFlashCardQuestionById(
        @PathVariable("flashCardQuestionId") flashCardQuestionId: Long,
        @RequestBody flashCardQuestionDTO: FlashCardQuestionDTO
    ): FlashCardQuestionDTO {
        return flashCardService.updateFlashCardQuestionById(flashCardQuestionId, flashCardQuestionDTO)
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{flashCardQuestionId}")
    fun deleteFlashCardQuestionById(@PathVariable("flashCardQuestionId") flashCardQuestionId: Long) {
        flashCardService.deleteFlashCardQuestionById(flashCardQuestionId)
    }
}

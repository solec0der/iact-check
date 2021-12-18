package ch.iact.iactcheck.controller

import ch.iact.iactcheck.dto.FlashCardQuestionDTO
import ch.iact.iactcheck.service.FlashCardService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
internal class FlashCardController(private val flashCardService: FlashCardService) {

    @GetMapping("/checks/{checkId}/flash-card-questions")
    fun getFlashCardsByCheckId(@PathVariable("checkId") checkId: Long): List<FlashCardQuestionDTO> {
        return flashCardService.getFlashCardsByCheckId(checkId)
    }
}

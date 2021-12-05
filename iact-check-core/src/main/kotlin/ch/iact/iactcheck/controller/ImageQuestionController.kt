package ch.iact.iactcheck.controller

import ch.iact.iactcheck.service.ImageQuestionService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/image-questions")
internal class ImageQuestionController(
    private val imageQuestionService: ImageQuestionService
) {

    @GetMapping("/image-answers/{imageAnswerId}/image", produces = [MediaType.IMAGE_PNG_VALUE])
    fun getImageByImageAnswerId(@PathVariable("imageAnswerId") imageAnswerId: Long): ByteArray {
        return imageQuestionService.getImageByImageAnswerId(imageAnswerId)
    }
}

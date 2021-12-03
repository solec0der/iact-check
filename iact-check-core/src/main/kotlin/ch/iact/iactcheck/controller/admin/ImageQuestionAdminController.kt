package ch.iact.iactcheck.controller.admin

import ch.iact.iactcheck.dto.ImageQuestionDTO
import ch.iact.iactcheck.service.ImageQuestionService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/admin/image-questions")
internal class ImageQuestionAdminController(
    private val imageQuestionService: ImageQuestionService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createImageQuestion(@RequestBody imageQuestionDTO: ImageQuestionDTO): ImageQuestionDTO {
        return imageQuestionService.createImageQuestion(imageQuestionDTO)
    }

    @GetMapping("/{imageQuestionId}")
    fun getImageQuestionById(@PathVariable("imageQuestionId") imageQuestionId: Long): ImageQuestionDTO {
        return imageQuestionService.getImageQuestionById(imageQuestionId)
    }

    @PutMapping("/{imageQuestionId}")
    fun updateImageQuestionById(
        @PathVariable("imageQuestionId") imageQuestionId: Long,
        @RequestBody imageQuestionDTO: ImageQuestionDTO
    ): ImageQuestionDTO {
        return imageQuestionService.updateImageQuestionById(imageQuestionId, imageQuestionDTO)
    }

    @PutMapping("/image-answers/{imageAnswerId}/image")
    fun uploadImageForImageQuestion(
        @PathVariable("imageAnswerId") imageAnswerId: Long,
        @RequestParam("image") file: MultipartFile
    ) {
        imageQuestionService.uploadImageForImageAnswer(imageAnswerId, file.bytes)
    }

    @DeleteMapping("/{imageQuestionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteImageQuestionById(@PathVariable("imageQuestionId") imageQuestionId: Long) {
        imageQuestionService.deleteImageQuestionById(imageQuestionId)
    }
}

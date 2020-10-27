package ch.showlab.showlabcheck.infrastructure.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import java.lang.RuntimeException

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "no such question category found")
class QuestionCategoryNotFoundException : RuntimeException()

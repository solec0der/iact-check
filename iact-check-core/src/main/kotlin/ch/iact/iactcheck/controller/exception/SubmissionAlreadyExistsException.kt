package ch.iact.iactcheck.controller.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "the submission already exists")
class SubmissionAlreadyExistsException : RuntimeException()

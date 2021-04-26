package ch.iact.iactcheck.controller.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "no such customer found")
class SubmissionNotFoundException : RuntimeException()

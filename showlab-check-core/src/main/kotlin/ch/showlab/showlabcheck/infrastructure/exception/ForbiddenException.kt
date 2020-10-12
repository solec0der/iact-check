package ch.showlab.showlabcheck.infrastructure.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "this action is forbidden")
class ForbiddenException : RuntimeException()

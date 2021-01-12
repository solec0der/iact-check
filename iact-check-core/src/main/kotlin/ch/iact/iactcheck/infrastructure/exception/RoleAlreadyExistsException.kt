package ch.iact.iactcheck.infrastructure.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "role already exists")
class RoleAlreadyExistsException : RuntimeException()

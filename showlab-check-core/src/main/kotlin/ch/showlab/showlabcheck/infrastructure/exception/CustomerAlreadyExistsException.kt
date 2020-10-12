package ch.showlab.showlabcheck.infrastructure.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import java.lang.RuntimeException

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "customer already exists")
class CustomerAlreadyExistsException : RuntimeException()

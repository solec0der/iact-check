package ch.iact.iactcheck.infrastructure.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import java.lang.RuntimeException

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "no such check found")
class EmailSettingsNotFoundException : RuntimeException()

package ch.iact.iactcheck.controller.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "a customer branding already exists for this customer")
class CustomerBrandingAlreadyExistsException : RuntimeException()

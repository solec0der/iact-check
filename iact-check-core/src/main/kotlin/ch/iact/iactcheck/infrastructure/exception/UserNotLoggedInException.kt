package ch.iact.iactcheck.infrastructure.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "user not logged in")
class UserNotLoggedInException : RuntimeException() 

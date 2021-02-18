package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.repository.CustomerRepository
import org.springframework.stereotype.Service

@Service
class TextMessageSettingsService(
    private val customerRepository: CustomerRepository
) {
}
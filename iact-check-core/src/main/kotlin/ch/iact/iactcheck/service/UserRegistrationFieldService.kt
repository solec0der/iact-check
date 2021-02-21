package ch.iact.iactcheck.service

import ch.iact.iactcheck.domain.repository.UserRegistrationFieldRepository
import ch.iact.iactcheck.dto.UserRegistrationFieldDTO
import ch.iact.iactcheck.dto.UserRegistrationFieldsDTO
import ch.iact.iactcheck.service.converter.UserRegistrationFieldConverter
import org.springframework.stereotype.Service

@Service
class UserRegistrationFieldService(
    private val userRegistrationFieldRepository: UserRegistrationFieldRepository
) {

    fun getUserRegistrationFields(): UserRegistrationFieldsDTO {
        return UserRegistrationFieldsDTO(
            userRegistrationFieldRepository.findAll()
                .map { UserRegistrationFieldConverter.convertUserRegistrationToDTO(it) }
                .toList())
    }
}
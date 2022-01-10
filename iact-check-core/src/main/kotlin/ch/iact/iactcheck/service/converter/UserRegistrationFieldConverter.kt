package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.ActiveUserRegistrationField
import ch.iact.iactcheck.domain.model.Customer
import ch.iact.iactcheck.domain.model.UserRegistrationField
import ch.iact.iactcheck.dto.ActiveUserRegistrationFieldDTO
import ch.iact.iactcheck.dto.UserRegistrationFieldDTO

object UserRegistrationFieldConverter {

    fun convertUserRegistrationToDTO(userRegistrationField: UserRegistrationField): UserRegistrationFieldDTO {
        return UserRegistrationFieldDTO(
            id = userRegistrationField.id,
            fieldName = userRegistrationField.fieldName
        )
    }

    fun convertActiveUserRegistrationToDTO(activeUserRegistrationField: ActiveUserRegistrationField): ActiveUserRegistrationFieldDTO {
        return ActiveUserRegistrationFieldDTO(
            id = activeUserRegistrationField.id,
            userRegistrationFieldId = activeUserRegistrationField.userRegistrationField.id,
            validationRegex = activeUserRegistrationField.validationRegex,
            required = activeUserRegistrationField.required
        )
    }

    fun convertActiveUserRegistrationToDomain(
        activeUserRegistrationFieldDTO: ActiveUserRegistrationFieldDTO,
        customer: Customer,
        userRegistrationField: UserRegistrationField
    ): ActiveUserRegistrationField {
        return ActiveUserRegistrationField(
            id = -1,
            userRegistrationField = userRegistrationField,
            customer = customer,
            validationRegex = activeUserRegistrationFieldDTO.validationRegex,
            required = activeUserRegistrationFieldDTO.required
        )
    }
}

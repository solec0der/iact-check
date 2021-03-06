package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.CheckNotFoundException
import ch.iact.iactcheck.controller.exception.CustomerNotFoundException
import ch.iact.iactcheck.controller.exception.FromDateAfterToDateException
import ch.iact.iactcheck.domain.model.Check
import ch.iact.iactcheck.domain.model.Language
import ch.iact.iactcheck.domain.repository.CheckRepository
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.dto.CheckDTO
import ch.iact.iactcheck.service.converter.CheckConverter
import org.springframework.stereotype.Service

@Service
class CheckService(
    private val checkRepository: CheckRepository,
    private val customerRepository: CustomerRepository
) {

    fun createCheck(checkDTO: CheckDTO): CheckDTO {
        if (checkDTO.activeFrom.isAfter(checkDTO.activeTo)) {
            throw FromDateAfterToDateException()
        }

        val customer = customerRepository
            .findById(checkDTO.customerId)
            .orElseThrow { throw CustomerNotFoundException() }

        val check = Check(
            id = -1,
            customer = customer,
            title = checkDTO.title,
            language = Language.findLanguageByLocale(checkDTO.language.locale),
            activeFrom = checkDTO.activeFrom,
            activeTo = checkDTO.activeTo,
            questionCategories = emptyList(),
            submissions = emptyList()
        )

        return CheckConverter.convertCheckToDTO(checkRepository.save(check))
    }

    fun getChecksByCustomerId(customerId: Long): List<CheckDTO> {
        val customers = checkRepository.findAllByCustomerId(customerId)

        return customers.map {
            CheckConverter.convertCheckToDTO(it)
        }.toList()
    }

    fun getCheckById(checkId: Long): CheckDTO {
        return CheckConverter.convertCheckToDTO(
            checkRepository.findById(checkId).orElseThrow { throw CheckNotFoundException() }
        )
    }

    fun updateCheckById(checkId: Long, checkDTO: CheckDTO): CheckDTO {
        if (checkDTO.activeFrom.isAfter(checkDTO.activeTo)) {
            throw FromDateAfterToDateException()
        }

        var check = checkRepository.findById(checkId).orElseThrow { throw CheckNotFoundException() }

        check = check.copy(
            title = checkDTO.title,
            language = Language.findLanguageByLocale(checkDTO.language.locale),
            activeFrom = checkDTO.activeFrom,
            activeTo = checkDTO.activeTo
        )

        return CheckConverter.convertCheckToDTO(checkRepository.save(check))
    }

    fun deleteCheckById(checkId: Long) {
        checkRepository.deleteById(checkId)
    }
}

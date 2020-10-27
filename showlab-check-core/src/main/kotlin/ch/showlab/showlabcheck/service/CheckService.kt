package ch.showlab.showlabcheck.service

import ch.showlab.showlabcheck.domain.model.Check
import ch.showlab.showlabcheck.domain.repository.CheckRepository
import ch.showlab.showlabcheck.domain.repository.CustomerRepository
import ch.showlab.showlabcheck.dto.CheckDTO
import ch.showlab.showlabcheck.infrastructure.exception.CheckNotFoundException
import ch.showlab.showlabcheck.infrastructure.exception.CustomerNotFoundException
import ch.showlab.showlabcheck.infrastructure.exception.FromDateAfterToDateException
import ch.showlab.showlabcheck.service.converter.CheckConverter
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

        val customer = customerRepository.findById(checkDTO.customerId).orElseThrow { throw CustomerNotFoundException() }

        val check = Check(
                id = -1,
                customer = customer,
                title = checkDTO.title,
                activeFrom = checkDTO.activeFrom,
                activeTo = checkDTO.activeTo,
                questionCategories = emptyList()
        )

        return CheckConverter.convertCheckToDTO(checkRepository.save(check))
    }

    fun getChecksByCustomerId(customerId: Long): List<CheckDTO> {
        val customers = checkRepository.findAllByCustomerId(customerId)

        return customers.map {
            CheckConverter.convertCheckToDTO(it)
        }.toList()
    }

    fun updateCheckById(checkId: Long, checkDTO: CheckDTO): CheckDTO {
        if (checkDTO.activeFrom.isAfter(checkDTO.activeTo)) {
            throw FromDateAfterToDateException()
        }

        var check = checkRepository.findById(checkId).orElseThrow { throw CheckNotFoundException() }

        check = check.copy(
                title = checkDTO.title,
                activeFrom = checkDTO.activeFrom,
                activeTo = checkDTO.activeTo
        )

        return CheckConverter.convertCheckToDTO(checkRepository.save(check))
    }

    fun deleteCheckById(checkId: Long) {
        checkRepository.deleteById(checkId)
    }
}

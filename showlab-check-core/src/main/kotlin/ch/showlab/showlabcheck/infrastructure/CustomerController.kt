package ch.showlab.showlabcheck.infrastructure

import ch.showlab.showlabcheck.dto.CustomerDTO
import ch.showlab.showlabcheck.service.CustomerService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/customers")
class CustomerController(
        private val customerService: CustomerService
) {

    @GetMapping
    fun getCustomers(): List<CustomerDTO> {
        return customerService.getCustomers()
    }

    @GetMapping("/{customerId}/logo", produces = [MediaType.IMAGE_PNG_VALUE])
    fun getCustomerLogoByCustomerId(@PathVariable("customerId") customerId: Long): ByteArray  {
        return customerService.getCustomerLogoByCustomerId(customerId)
    }
}

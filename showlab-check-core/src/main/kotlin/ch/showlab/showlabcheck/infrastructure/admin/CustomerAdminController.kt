package ch.showlab.showlabcheck.infrastructure.admin

import ch.showlab.showlabcheck.dto.CustomerDTO
import ch.showlab.showlabcheck.service.CustomerService
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import javax.annotation.security.RolesAllowed

@RestController
@RequestMapping("/api/admin/customers")
class CustomerAdminController(
        private val customerService: CustomerService
) {

    @PostMapping
    @RolesAllowed("SUPERUSER")
    fun createCustomer(@RequestBody customerDTO: CustomerDTO): CustomerDTO {
        return customerService.createCustomer(customerDTO)
    }

    @PutMapping("/{customerId}/logo")
    fun uploadCustomerLogoByCustomerId(
            @PathVariable("customerId") customerId: Long,
            @RequestParam("logo") file: MultipartFile
    ) {
        customerService.uploadCustomerLogo(customerId, file.bytes)
    }

    @GetMapping
    fun getAccessibleCustomers(): List<CustomerDTO> {
        return customerService.getAccessibleCustomers()
    }

    @PutMapping("/{customerId}")
    fun updateCustomerById(
            @PathVariable("customerId") customerId: Long,
            @RequestBody customerDTO: CustomerDTO
    ): CustomerDTO {
        return customerService.updateCustomerById(customerId, customerDTO)
    }

    @DeleteMapping("/{customerId}")
    fun deleteCustomerById(@PathVariable("customerId") customerId: Long) {
        customerService.deleteCustomerById(customerId)
    }
}

package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.CustomerBrandingDTO
import ch.iact.iactcheck.dto.CustomerDTO
import ch.iact.iactcheck.service.CustomerService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import javax.annotation.security.RolesAllowed

@RestController
@RequestMapping("/api/admin/customers")
internal class CustomerAdminController(
    private val customerService: CustomerService
) {

    @PostMapping
    @RolesAllowed("SUPERUSER")
    @ResponseStatus(HttpStatus.CREATED)
    fun createCustomer(@RequestBody customerDTO: CustomerDTO): CustomerDTO {
        return customerService.createCustomer(customerDTO)
    }

    @PutMapping("/{customerId}/branding/logo", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
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

    @GetMapping("/{customerId}")
    fun getCustomerById(@PathVariable("customerId") customerId: Long): CustomerDTO {
        return customerService.getCustomerById(customerId)
    }

    @PutMapping("/{customerId}")
    fun updateCustomerById(
        @PathVariable("customerId") customerId: Long,
        @RequestBody customerDTO: CustomerDTO
    ): CustomerDTO {
        return customerService.updateCustomerById(customerId, customerDTO)
    }

    @DeleteMapping("/{customerId}")
    @RolesAllowed("SUPERUSER")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteCustomerById(@PathVariable("customerId") customerId: Long) {
        customerService.deleteCustomerById(customerId)
    }
}

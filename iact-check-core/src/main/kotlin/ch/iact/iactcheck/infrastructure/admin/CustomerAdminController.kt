package ch.iact.iactcheck.infrastructure.admin

import ch.iact.iactcheck.dto.CustomerBrandingDTO
import ch.iact.iactcheck.dto.CustomerDTO
import ch.iact.iactcheck.service.CustomerService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.ExampleObject
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
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

    @PostMapping("/{customerId}/branding")
    fun createCustomerBranding(
            @PathVariable("customerId") customerId: Long,
            @RequestBody customerBrandingDTO: CustomerBrandingDTO
    ): CustomerBrandingDTO {
        return customerService.createCustomerBranding(customerId, customerBrandingDTO)
    }

    @PutMapping("/{customerId}/logo", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
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

    @PutMapping("/{customerId}/branding")
    fun updateCustomerBrandingByCustomerId(
            @PathVariable("customerId") customerId: Long,
            @RequestBody customerBrandingDTO: CustomerBrandingDTO
    ): CustomerBrandingDTO {
        return customerService.updateCustomerBranding(customerId, customerBrandingDTO)
    }

    @DeleteMapping("/{customerId}")
    @RolesAllowed("SUPERUSER")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteCustomerById(@PathVariable("customerId") customerId: Long) {
        customerService.deleteCustomerById(customerId)
    }
}

package ch.showlab.showlabcheck.infrastructure.admin

import ch.showlab.showlabcheck.dto.CustomerDTO
import ch.showlab.showlabcheck.service.CustomerService
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
    @Operation(
            summary = "createCustomer",
            description = "Creates a customer. Per customer, there will be a dedicated endpoint in the frontend, " +
                    "where the check will take place.",
            tags = ["customer"]
    )
    @ApiResponses(
            value = [
                ApiResponse(responseCode = "201",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = Schema(implementation = CustomerDTO::class),
                                    examples = [
                                        ExampleObject(
                                                name = "201 Created Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/customer/create_customer_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun createCustomer(@RequestBody customerDTO: CustomerDTO): CustomerDTO {
        return customerService.createCustomer(customerDTO)
    }

    @PutMapping("/{customerId}/logo", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    @Operation(
            summary = "uploadCustomerLogoByCustomerId",
            description = "Uploads a new customer logo for the customer with the id in the path. " +
                    "Existing logos will be replaced.",
            tags = ["customer"]
    )
    fun uploadCustomerLogoByCustomerId(
            @PathVariable("customerId") customerId: Long,
            @RequestParam("logo") file: MultipartFile
    ) {
        customerService.uploadCustomerLogo(customerId, file.bytes)
    }

    @GetMapping
    @Operation(
            summary = "getAccessibleCustomers",
            description = "Returns a list of customers that the logged in user is permitted to edit.",
            tags = ["customer"]
    )
    @ApiResponses(
            value = [
                ApiResponse(responseCode = "200",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = Schema(implementation = CustomerDTO::class),
                                    examples = [
                                        ExampleObject(
                                                name = "200 OK Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/customer/get_accessible_customers_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun getAccessibleCustomers(): List<CustomerDTO> {
        return customerService.getAccessibleCustomers()
    }

    @PutMapping("/{customerId}")
    @Operation(
            summary = "updateCustomerById",
            description = "Updates all fields of a customer. If no customer can be found with the customerId, a 404 Not Found will be returned",
            tags = ["customer"]
    )
    @ApiResponses(
            value = [
                ApiResponse(responseCode = "200",
                        content = [
                            Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = Schema(implementation = CustomerDTO::class),
                                    examples = [
                                        ExampleObject(
                                                name = "200 OK Response",
                                                externalValue = "/showlab-check-core/public-api/documentation/private/examples/customer/update_customer_response.txt")
                                    ]
                            )
                        ]
                )
            ]
    )
    fun updateCustomerById(
            @PathVariable("customerId") customerId: Long,
            @RequestBody customerDTO: CustomerDTO
    ): CustomerDTO {
        return customerService.updateCustomerById(customerId, customerDTO)
    }

    @DeleteMapping("/{customerId}")
    @RolesAllowed("SUPERUSER")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            summary = "deleteCustomerById",
            description = "Deletes a customer and all related data",
            tags = ["customer"]
    )
    fun deleteCustomerById(@PathVariable("customerId") customerId: Long) {
        customerService.deleteCustomerById(customerId)
    }
}

package ch.iact.iactcheck.infrastructure

import ch.iact.iactcheck.dto.CustomerDTO
import ch.iact.iactcheck.service.CustomerService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.ExampleObject
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/customers")
internal class CustomerController(
    private val customerService: CustomerService
) {

    @GetMapping
    @Operation(
        summary = "getCustomers",
        description = "Returns a list of all customers",
        tags = ["customer"]
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                content = [
                    Content(
                        mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = Schema(implementation = CustomerDTO::class),
                        examples = [
                            ExampleObject(
                                name = "200 OK Response",
                                externalValue = "/iact-check-core/public-api/documentation/private/examples/customer/get_customers_response.txt"
                            )
                        ]
                    )
                ]
            )
        ]
    )
    fun getCustomers(): List<CustomerDTO> {
        return customerService.getCustomers()
    }

    @GetMapping("/{customerId}/branding/logo", produces = [MediaType.IMAGE_PNG_VALUE])
    @Operation(
        summary = "getCustomerLogoByCustomerId",
        description = "Returns a png representation of the customers logo",
        tags = ["customer"]
    )
    fun getCustomerLogoByCustomerId(@PathVariable("customerId") customerId: Long): ByteArray {
        return customerService.getCustomerLogoByCustomerId(customerId)
    }
}

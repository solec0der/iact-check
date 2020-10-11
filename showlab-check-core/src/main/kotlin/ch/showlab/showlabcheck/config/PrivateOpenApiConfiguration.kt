package ch.showlab.showlabcheck.config

import ch.showlab.showlabcheck.common.FileLoaderUtil
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.models.security.SecurityRequirement
import io.swagger.v3.oas.models.security.SecurityScheme
import org.springdoc.core.GroupedOpenApi
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@OpenAPIDefinition(info = Info(
        title = "Balloon-Mail Private API Documentation"
))
class PrivateOpenApiConfiguration {

    @Value("\${info.app.version:?}")
    private val version: String = ""

    private val title = "Showlab-Check Private API"
    private val basePackage = "ch.showlab.showlabcheck"

    @Bean
    fun privateApi(): GroupedOpenApi {
        val description = FileLoaderUtil.getResourceFileAsString("public-api/documentation/private/description.txt")

        val securityScheme = SecurityScheme()
        securityScheme.type = SecurityScheme.Type.HTTP

        val securityRequirement = SecurityRequirement()
        securityRequirement.addList("Basic")

        return GroupedOpenApi.builder()
                .setGroup("private")
                .addOpenApiCustomiser {
                    it.info.title = title
                    it.info.version = version
                    it.info.description = description
                    it.schemaRequirement("Basic", securityScheme)
                    it.addSecurityItem(securityRequirement)
                }
                .packagesToScan("$basePackage.infrastructure", "$basePackage.dto")
                .build()
    }

    @Bean
    fun webMvcConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
                registry.addResourceHandler("/public-api/**").addResourceLocations("classpath:/public-api/")
                registry.addResourceHandler("/favicon.ico").addResourceLocations("classpath:/favicon.ico")
            }
        }
    }
}

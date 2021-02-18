package ch.iact.iactcheck.config.security

import org.keycloak.adapters.springsecurity.KeycloakSecurityComponents
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper
import org.springframework.security.core.session.SessionRegistryImpl
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
    prePostEnabled = true,
    securedEnabled = true,
    jsr250Enabled = true
)
@ComponentScan(basePackageClasses = [KeycloakSecurityComponents::class])
class WebSecurity : KeycloakWebSecurityConfigurerAdapter() {

    @Autowired
    fun configureGlobal(builder: AuthenticationManagerBuilder) {
        val keycloakAuthenticationProvider = keycloakAuthenticationProvider()
        keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(SimpleAuthorityMapper())
        builder.authenticationProvider(keycloakAuthenticationProvider)
    }

    @Bean
    override fun sessionAuthenticationStrategy(): SessionAuthenticationStrategy {
        return RegisterSessionAuthenticationStrategy(SessionRegistryImpl())
    }

    override fun configure(httpSecurity: HttpSecurity) {
        http.cors().and().csrf().disable().authorizeRequests()
            .antMatchers(
                HttpMethod.GET, "/swagger-ui.html", "/webjars/springfox-swagger-ui/**",
                "/swagger-resources/**", "/v2/api-docs", "/csrf", "/swagger-ui/**"
            ).permitAll()
            .antMatchers(HttpMethod.GET, "/public/**").permitAll()
            .antMatchers("/**/public-api/**").permitAll()
            .antMatchers(HttpMethod.GET, "/v3/**").permitAll()
            .antMatchers(HttpMethod.GET, "/actuator/**").permitAll()
            .antMatchers("/api/**").permitAll()
            .antMatchers("/api/admin/**").hasAnyRole("SUPERUSER", "ORGANIZATION_ADMINISTRATOR")
            .anyRequest().authenticated();
    }
}

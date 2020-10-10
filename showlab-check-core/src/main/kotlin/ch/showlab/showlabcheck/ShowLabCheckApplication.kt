package ch.showlab.showlabcheck

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.runApplication

@EntityScan(basePackageClasses = [ShowLabCheckApplication::class])
@SpringBootApplication(scanBasePackages = ["ch.showlab.showlabcheck"])
class ShowLabCheckApplication

fun main(args: Array<String>) {
    runApplication<ShowLabCheckApplication>(*args)
}

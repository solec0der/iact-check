package ch.iact.iactcheck

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.runApplication

@EntityScan(basePackageClasses = [IactCheckApplication::class])
@SpringBootApplication(scanBasePackages = ["ch.iact.iactcheck"])
class IactCheckApplication

fun main(args: Array<String>) {
    runApplication<IactCheckApplication>(*args)
}

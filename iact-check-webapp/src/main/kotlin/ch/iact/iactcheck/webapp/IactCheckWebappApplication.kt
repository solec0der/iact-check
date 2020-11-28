package ch.iact.iactcheck.webapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["ch.iact.iactcheck.webapp"])
class IactCheckWebappApplication

fun main(args: Array<String>) {
    runApplication<IactCheckWebappApplication>(*args)
}

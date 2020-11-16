package ch.showlab.showlabcheck.testdata

import ch.showlab.showlabcheck.domain.model.Check
import ch.showlab.showlabcheck.dto.CheckDTO
import java.time.LocalDateTime

object CheckTestData {

    val check = Check(
            id = 1L,
            customer = CustomerTestData.customer,
            title = "Check One",
            activeFrom = LocalDateTime.parse("2020-01-01T09:00:00"),
            activeTo = LocalDateTime.parse("2020-01-04T09:00:00"),
            questionCategories = emptyList()
    )

    val checkDTO = CheckDTO(
            id = 1L,
            customerId = 1L,
            title = "Check One",
            activeFrom = LocalDateTime.parse("2020-01-01T09:00:00"),
            activeTo = LocalDateTime.parse("2020-01-04T09:00:00"),
            questionCategories = emptyList()
    )
}

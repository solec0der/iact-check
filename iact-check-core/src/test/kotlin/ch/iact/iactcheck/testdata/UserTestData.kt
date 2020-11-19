package ch.iact.iactcheck.testdata

import ch.iact.iactcheck.dto.UserDTO

object UserTestData {

    val userDTO = UserDTO(
            userId = "03587ae9-cabf-4a10-9271-32152a509fe1",
            preferredUsername = "admin",
            email = "",
            roles = setOf("SUPERUSER", "ORGANIZATION_ADMINISTRATOR")
    )

    val userDTO2 = UserDTO(
            userId = "1ab581c6-0d0d-4e37-a72a-f525403f8316",
            preferredUsername = "yhuggler",
            email = "yannick@huggler.io",
            roles = setOf("ORGANIZATION_ADMINISTRATOR")
    )
}
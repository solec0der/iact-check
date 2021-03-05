package ch.iact.iactcheck.service

import ch.iact.iactcheck.IactCheckApplication
import ch.iact.iactcheck.domain.model.Check
import ch.iact.iactcheck.domain.model.Language
import ch.iact.iactcheck.domain.repository.CheckRepository
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.dto.LanguageDTO
import ch.iact.iactcheck.controller.exception.CheckNotFoundException
import ch.iact.iactcheck.controller.exception.FromDateAfterToDateException
import ch.iact.iactcheck.testdata.CheckTestData
import ch.iact.iactcheck.testdata.CustomerTestData
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.eq
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.boot.test.context.SpringBootTest
import java.time.Instant
import java.util.*

@RunWith(MockitoJUnitRunner::class)
@SpringBootTest(classes = [IactCheckApplication::class])
class CheckServiceTest {

    @InjectMocks
    private val checkService: CheckService? = null

    @Mock
    private val checkRepository: CheckRepository? = null

    @Mock
    private val customerRepository: CustomerRepository? = null

    @Test
    fun shouldCreateCheckAndReturnCreatedCheck() {
        `when`(customerRepository!!.findById(eq(1L))).thenReturn(Optional.of(CustomerTestData.customer))
        `when`(checkRepository!!.save(any(Check::class.java))).thenReturn(CheckTestData.check)

        val actual = checkService!!.createCheck(CheckTestData.checkDTO)
        val expected = CheckTestData.checkDTO

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowFromDateAfterToDateExceptionWhenCreatingCheck() {
        val input = CheckTestData.checkDTO.copy(
            activeTo = CheckTestData.checkDTO.activeFrom,
            activeFrom = CheckTestData.checkDTO.activeTo
        )

        assertThrows<FromDateAfterToDateException> {
            checkService!!.createCheck(input)
        }
    }

    @Test
    fun shouldReturnChecksByCustomerId() {
        `when`(checkRepository!!.findAllByCustomerId(eq(1L))).thenReturn(listOf(CheckTestData.check))

        val actual = checkService!!.getChecksByCustomerId(1L)
        val expected = listOf(CheckTestData.checkDTO)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldUpdateCheckByIdAndReturnUpdatedCheck() {
        val updatedCheck = CheckTestData.check.copy(
            title = "New title",
            language = Language.GERMAN,
            activeFrom = Instant.parse("2020-02-02T10:00:00Z"),
            activeTo = Instant.parse("2020-02-04T10:00:00Z")
        )

        `when`(checkRepository!!.findById(eq(1L))).thenReturn(Optional.of(CheckTestData.check))
        `when`(checkRepository.save(any(Check::class.java))).thenReturn(updatedCheck)

        val expected = CheckTestData.checkDTO.copy(
            title = "New title",
            language = LanguageDTO(
                language = "GERMAN",
                locale = "de-CH"
            ),
            activeFrom = Instant.parse("2020-02-02T10:00:00Z"),
            activeTo = Instant.parse("2020-02-04T10:00:00Z")
        )

        val actual = checkService!!.updateCheckById(1L, expected)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowCheckNotFoundExceptionWhenPassingInvalidCheckId() {
        `when`(checkRepository!!.findById(eq(100L))).thenReturn(Optional.empty())

        assertThrows<CheckNotFoundException> {
            checkService!!.updateCheckById(100L, CheckTestData.checkDTO)
        }
    }

    @Test
    fun shouldThrowFromDateAfterToDateExceptionWhenUpdatingCheck() {
        val input = CheckTestData.checkDTO.copy(
            activeTo = CheckTestData.checkDTO.activeFrom,
            activeFrom = CheckTestData.checkDTO.activeTo
        )

        assertThrows<FromDateAfterToDateException> {
            checkService!!.updateCheckById(1L, input)
        }
    }
}

package ch.iact.iactcheck.service

import ch.iact.iactcheck.IactCheckApplication
import ch.iact.iactcheck.domain.model.PossibleOutcome
import ch.iact.iactcheck.domain.model.PossibleScore
import ch.iact.iactcheck.domain.repository.PossibleOutcomeRepository
import ch.iact.iactcheck.domain.repository.PossibleScoreRepository
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.infrastructure.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.testdata.PossibleOutcomeTestData
import ch.iact.iactcheck.testdata.PossibleScoreTestData
import ch.iact.iactcheck.testdata.QuestionCategoryTestData
import ch.iact.iactcheck.testdata.QuestionTestData
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.Mockito.any
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.boot.test.context.SpringBootTest
import java.util.*

@RunWith(MockitoJUnitRunner::class)
@SpringBootTest(classes = [IactCheckApplication::class])
class PossibleOutcomeServiceTest {

    @InjectMocks
    private val possibleOutcomeService: PossibleOutcomeService? = null

    @Mock
    private val possibleOutcomeRepository: PossibleOutcomeRepository? = null

    @Mock
    private val questionCategoryRepository: QuestionCategoryRepository? = null

    @Mock
    private val possibleScoreRepository: PossibleScoreRepository? = null

    @Test
    fun shouldCreatePossibleOutcomeAndReturnCreatedPossibleOutcome() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(QuestionCategoryTestData.questionCategory))
        `when`(possibleOutcomeRepository!!.save(any(PossibleOutcome::class.java))).thenReturn(PossibleOutcomeTestData.possibleOutcome)
        `when`(possibleScoreRepository!!.save(any(PossibleScore::class.java))).thenReturn(PossibleScoreTestData.possibleScore)

        val actual = possibleOutcomeService!!.createPossibleOutcome(PossibleOutcomeTestData.possibleOutcomeDTO)

        Assert.assertEquals(PossibleOutcomeTestData.possibleOutcomeDTO, actual)
    }

    @Test
    fun shouldThrowQuestionCategoryNotFoundExceptionWhenPassingInvalidId() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionCategoryNotFoundException> {
            possibleOutcomeService!!.createPossibleOutcome(PossibleOutcomeTestData.possibleOutcomeDTO)
        }
    }
}
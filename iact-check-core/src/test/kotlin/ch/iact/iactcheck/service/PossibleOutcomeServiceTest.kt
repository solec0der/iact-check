package ch.iact.iactcheck.service

import ch.iact.iactcheck.IactCheckApplication
import ch.iact.iactcheck.controller.exception.PossibleOutcomeNotFoundException
import ch.iact.iactcheck.controller.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.domain.model.PossibleOutcome
import ch.iact.iactcheck.domain.model.PossibleScore
import ch.iact.iactcheck.domain.repository.PossibleOutcomeRepository
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.domain.repository.SubmissionRepository
import ch.iact.iactcheck.dto.PossibleScoreDTO
import ch.iact.iactcheck.testdata.PossibleOutcomeTestData
import ch.iact.iactcheck.testdata.QuestionCategoryTestData
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
    private val submissionRepository: SubmissionRepository? = null

    @Test
    fun shouldCreatePossibleOutcomeAndReturnCreatedPossibleOutcome() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(
            Optional.of(
                QuestionCategoryTestData.questionCategory
            )
        )
        `when`(possibleOutcomeRepository!!.save(any(PossibleOutcome::class.java))).thenReturn(PossibleOutcomeTestData.possibleOutcomeWithPossibleScores)

        val actual =
            possibleOutcomeService!!.createPossibleOutcome(PossibleOutcomeTestData.possibleOutcomeDTOWithPossibleScores)

        Assert.assertEquals(PossibleOutcomeTestData.possibleOutcomeDTOWithPossibleScores, actual)
    }

    @Test
    fun shouldThrowQuestionCategoryNotFoundExceptionWhenPassingInvalidIdWhileCreatingPossibleOutcome() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionCategoryNotFoundException> {
            possibleOutcomeService!!.createPossibleOutcome(PossibleOutcomeTestData.possibleOutcomeDTO)
        }
    }

    @Test
    fun shouldUpdatePossibleOutcomeAndReturnUpdatedPossibleOutcome() {
        `when`(possibleOutcomeRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(
            Optional.of(
                PossibleOutcomeTestData.possibleOutcomeWithPossibleScores
            )
        )

        val updatedPossibleOutcome = PossibleOutcomeTestData.possibleOutcomeWithPossibleScores.copy(
            title = "New title",
            subtitle = "New Subtitle",
            description = "New description",
            possibleScores = listOf(
                PossibleScore(
                    id = 1,
                    score = 1,
                    possibleOutcome = PossibleOutcomeTestData.possibleOutcomeWithPossibleScores
                )
            )
        )

        val updatedPossibleOutcomeDTO = PossibleOutcomeTestData.possibleOutcomeDTOWithPossibleScores.copy(
            title = "New title",
            subtitle = "New Subtitle",
            description = "New description",
            possibleScores = listOf(PossibleScoreDTO(id = 1, score = 1))
        )

        `when`(possibleOutcomeRepository.save(any(PossibleOutcome::class.java))).thenReturn(updatedPossibleOutcome)

        val actual = possibleOutcomeService!!.updatePossibleOutcomeById(1L, updatedPossibleOutcomeDTO)

        Assert.assertEquals(updatedPossibleOutcomeDTO, actual)
    }

    @Test
    fun shouldThrowPossibleOutcomeNotFoundExceptionWhenPassingInvalidIdWhileUpdatingPossibleOutcome() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<PossibleOutcomeNotFoundException> {
            possibleOutcomeService!!.updatePossibleOutcomeById(1L, PossibleOutcomeTestData.possibleOutcomeDTO)
        }
    }

}

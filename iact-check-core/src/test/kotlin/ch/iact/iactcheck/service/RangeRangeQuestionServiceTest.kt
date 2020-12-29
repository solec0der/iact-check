package ch.iact.iactcheck.service

import ch.iact.iactcheck.IactCheckApplication
import ch.iact.iactcheck.domain.model.RangeQuestion
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.domain.repository.RangeQuestionRepository
import ch.iact.iactcheck.infrastructure.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.infrastructure.exception.QuestionNotFoundException
import ch.iact.iactcheck.testdata.QuestionCategoryTestData
import ch.iact.iactcheck.testdata.RangeQuestionTestData
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.boot.test.context.SpringBootTest
import java.util.*

@RunWith(MockitoJUnitRunner::class)
@SpringBootTest(classes = [IactCheckApplication::class])
class RangeRangeQuestionServiceTest {

    @InjectMocks
    private val rangeQuestionService: RangeQuestionService? = null

    @Mock
    private val rangeQuestionRepository: RangeQuestionRepository? = null

    @Mock
    private val questionCategoryRepository: QuestionCategoryRepository? = null

    @Test
    fun shouldCreateQuestionAndReturnCreatedQuestion() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(QuestionCategoryTestData.questionCategory))
        `when`(rangeQuestionRepository!!.save(any(RangeQuestion::class.java))).thenReturn(RangeQuestionTestData.question)

        val actual = rangeQuestionService!!.createRangeQuestion(RangeQuestionTestData.questionDTO)

        Assert.assertEquals(RangeQuestionTestData.questionDTO, actual)
    }

    @Test
    fun shouldThrowQuestionCategoryNotFoundExceptionWhenPassingInvalidId() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionCategoryNotFoundException> {
            rangeQuestionService!!.createRangeQuestion(RangeQuestionTestData.questionDTO)
        }
    }

    @Test
    fun shouldUpdateQuestionByIdAndReturnUpdatedQuestion() {
        `when`(rangeQuestionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(RangeQuestionTestData.question))

        val updatedQuestionDTO = RangeQuestionTestData.questionDTO.copy(
                questionText = "new question text",
                rangeSteps = emptyList()
        )

        val updatedQuestion = RangeQuestionTestData.question.copy(
                questionText = "new question text",
                rangeSteps = emptyList()
        )

        `when`(rangeQuestionRepository.save(any(RangeQuestion::class.java))).thenReturn(updatedQuestion)

        val actual = rangeQuestionService!!.updateQuestionById(1L, updatedQuestionDTO)

        Assert.assertEquals(updatedQuestionDTO, actual)
    }

    @Test
    fun shouldThrowQuestionNotFoundExceptionWhenPassingInvalidIdWhileUpdatingQuestion() {
        `when`(rangeQuestionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionNotFoundException> {
            rangeQuestionService!!.updateQuestionById(1L, RangeQuestionTestData.questionDTO)
        }
    }

    @Test
    fun shouldThrowQuestionNotFoundExceptionWhenPassingInvalidIdWhileUploadingIcon() {
        `when`(rangeQuestionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionNotFoundException> {
            rangeQuestionService!!.uploadIconForQuestion(1L, ByteArray(100))
        }
    }

    @Test
    fun shouldReturnIconByQuestionId() {
        `when`(rangeQuestionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(RangeQuestionTestData.question))

        val expected = ByteArray(100)
        val actual = rangeQuestionService!!.getIconByRangeQuestionId(1L)

        Assert.assertEquals(expected.size, actual.size)
    }

    @Test
    fun shouldThrowQuestionNotFoundExceptionWhenPassingInvalidIdWhileFetchingIcon() {
        `when`(rangeQuestionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionNotFoundException> {
            rangeQuestionService!!.getIconByRangeQuestionId(1L)
        }
    }
}

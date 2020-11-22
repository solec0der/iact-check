package ch.iact.iactcheck.service

import ch.iact.iactcheck.IactCheckApplication
import ch.iact.iactcheck.domain.model.Question
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.domain.repository.QuestionRepository
import ch.iact.iactcheck.infrastructure.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.infrastructure.exception.QuestionNotFoundException
import ch.iact.iactcheck.testdata.QuestionCategoryTestData
import ch.iact.iactcheck.testdata.QuestionTestData
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
import kotlin.math.exp

@RunWith(MockitoJUnitRunner::class)
@SpringBootTest(classes = [IactCheckApplication::class])
class QuestionServiceTest {

    @InjectMocks
    private val questionService: QuestionService? = null

    @Mock
    private val questionRepository: QuestionRepository? = null

    @Mock
    private val questionCategoryRepository: QuestionCategoryRepository? = null

    @Test
    fun shouldCreateQuestionAndReturnCreatedQuestion() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(QuestionCategoryTestData.questionCategory))
        `when`(questionRepository!!.save(any(Question::class.java))).thenReturn(QuestionTestData.question)

        val actual = questionService!!.createQuestion(QuestionTestData.questionDTO)

        Assert.assertEquals(QuestionTestData.questionDTO, actual)
    }

    @Test
    fun shouldThrowQuestionCategoryNotFoundExceptionWhenPassingInvalidId() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionCategoryNotFoundException> {
            questionService!!.createQuestion(QuestionTestData.questionDTO)
        }
    }

    @Test
    fun shouldUpdateQuestionByIdAndReturnUpdatedQuestion() {
        `when`(questionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(QuestionTestData.question))

        val updatedQuestionDTO = QuestionTestData.questionDTO.copy(
                questionText = "new question text",
                minScore = 2,
                maxScore = 6
        )

        val updatedQuestion = QuestionTestData.question.copy(
                questionText = "new question text",
                minScore = 2,
                maxScore = 6
        )

        `when`(questionRepository.save(any(Question::class.java))).thenReturn(updatedQuestion)

        val actual = questionService!!.updateQuestionById(1L, updatedQuestionDTO)

        Assert.assertEquals(updatedQuestionDTO, actual)
    }

    @Test
    fun shouldThrowQuestionNotFoundExceptionWhenPassingInvalidIdWhileUpdatingQuestion() {
        `when`(questionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionNotFoundException> {
            questionService!!.updateQuestionById(1L, QuestionTestData.questionDTO)
        }
    }

    @Test
    fun shouldThrowQuestionNotFoundExceptionWhenPassingInvalidIdWhileUploadingIcon() {
        `when`(questionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionNotFoundException> {
            questionService!!.uploadIconForQuestion(1L, ByteArray(100))
        }
    }

    @Test
    fun shouldReturnIconByQuestionId() {
        `when`(questionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(QuestionTestData.question))

        val expected = ByteArray(100)
        val actual = questionService!!.getIconByQuestionId(1L)

        Assert.assertEquals(expected.size, actual.size)
    }

    @Test
    fun shouldThrowQuestionNotFoundExceptionWhenPassingInvalidIdWhileFetchingIcon() {
        `when`(questionRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionNotFoundException> {
            questionService!!.getIconByQuestionId(1L)
        }
    }
}
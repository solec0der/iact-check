package ch.iact.iactcheck.service

import ch.iact.iactcheck.IactCheckApplication
import ch.iact.iactcheck.domain.model.QuestionCategory
import ch.iact.iactcheck.domain.repository.CheckRepository
import ch.iact.iactcheck.domain.repository.QuestionCategoryRepository
import ch.iact.iactcheck.infrastructure.exception.CheckNotFoundException
import ch.iact.iactcheck.infrastructure.exception.QuestionCategoryNotFoundException
import ch.iact.iactcheck.testdata.CheckTestData
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
class RangeQuestionCategoryServiceTest {

    @InjectMocks
    private val questionCategoryService: QuestionCategoryService? = null

    @Mock
    private val checkRepository: CheckRepository? = null

    @Mock
    private val questionCategoryRepository: QuestionCategoryRepository? = null

    @Test
    fun shouldCreateQuestionCategoryAndReturnCreatedQuestionCategory() {
        `when`(checkRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(CheckTestData.check))
        `when`(questionCategoryRepository!!.save(any(QuestionCategory::class.java))).thenReturn(QuestionCategoryTestData.questionCategory)

        val actual = questionCategoryService!!.createQuestionCategory(QuestionCategoryTestData.questionCategoryDTO)

        Assert.assertEquals(QuestionCategoryTestData.questionCategoryDTO, actual)
    }

    @Test
    fun shouldThrowCheckNotFoundExceptionWhenCreatingQuestionCategoryForNonExistentCheck() {
        `when`(checkRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<CheckNotFoundException> {
            questionCategoryService!!.createQuestionCategory(QuestionCategoryTestData.questionCategoryDTO)
        }
    }

    @Test
    fun shouldThrowQuestionCategoryNotFoundExceptionWhenUploadingThumbnailOnNonExistentQuestionCategory() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionCategoryNotFoundException> {
            questionCategoryService!!.uploadThumbnailForQuestionCategory(1L, ByteArray(100))
        }
    }

    @Test
    fun shouldReturnThumbnailOfQuestionCategoryById() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(QuestionCategoryTestData.questionCategory))

        val expected = QuestionCategoryTestData.questionCategory.thumbnail
        val actual = questionCategoryService!!.getThumbnailByQuestionCategoryId(1L)

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldThrowQuestionCategoryNotFoundExceptionWhenFetchingThumbnailOfNonExistentQuestionCategory() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionCategoryNotFoundException> {
            questionCategoryService!!.getThumbnailByQuestionCategoryId(1L)
        }
    }

    @Test
    fun shouldUpdateQuestionCategoryAndReturnUpdatedQuestionCategory() {
        val updatedQuestionCategoryDTO = QuestionCategoryTestData.questionCategoryDTO.copy(title = "Math")
        val updatedQuestionCategory = QuestionCategoryTestData.questionCategory.copy(title = "Math")

        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(QuestionCategoryTestData.questionCategory))
        `when`(questionCategoryRepository.save(any(QuestionCategory::class.java))).thenReturn(updatedQuestionCategory)

        val actual = questionCategoryService!!.updateQuestionCategoryById(1L, updatedQuestionCategoryDTO)

        Assert.assertEquals(updatedQuestionCategoryDTO, actual)
    }

    @Test
    fun shouldThrowQuestionCategoryNotFoundExceptionWhenUpdatingNonExistentQuestionCategory() {
        `when`(questionCategoryRepository!!.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.empty())

        assertThrows<QuestionCategoryNotFoundException> {
            questionCategoryService!!.updateQuestionCategoryById(1L, QuestionCategoryTestData.questionCategoryDTO)
        }
    }
}

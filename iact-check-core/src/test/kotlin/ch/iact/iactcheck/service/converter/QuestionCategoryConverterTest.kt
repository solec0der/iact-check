package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.testdata.QuestionCategoryTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class QuestionCategoryConverterTest {

    @Test
    fun shouldReturnConvertedQuestionCategoryDTO() {
        val actual = QuestionCategoryConverter.convertQuestionCategoryToDTO(QuestionCategoryTestData.questionCategory)

        Assert.assertEquals(QuestionCategoryTestData.questionCategoryDTO, actual)
    }
}
package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.testdata.PossibleScoreTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class PossibleScoreConverterTest {

    @Test
    fun shouldReturnConvertedPossibleScoreDTO() {
        val actual = PossibleScoreConverter.convertPossibleScoreToDTO(PossibleScoreTestData.possibleScore)

        Assert.assertEquals(PossibleScoreTestData.possibleScoreDTO, actual)
    }
}
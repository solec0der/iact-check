package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.testdata.PossibleOutcomeTestData
import org.junit.Assert
import org.junit.jupiter.api.Test

class PossibleOutcomeConverterTest {

    @Test
    fun shouldReturnConvertedPossibleOutcomeDTO() {
        val actual = PossibleOutcomeConverter.convertPossibleOutcomeToDTO(PossibleOutcomeTestData.possibleOutcome)

        Assert.assertEquals(PossibleOutcomeTestData.possibleOutcomeDTO, actual)
    }

    @Test
    fun shouldReturnConvertedPossibleOutcomeDTOWithPossibleScores() {
        val actual = PossibleOutcomeConverter.convertPossibleOutcomeToDTO(PossibleOutcomeTestData.possibleOutcomeWithPossibleScores)

        Assert.assertEquals(PossibleOutcomeTestData.possibleOutcomeDTOWithPossibleScores, actual)
    }
}
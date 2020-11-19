package ch.iact.iactcheck.common

import org.junit.Assert
import org.junit.jupiter.api.Test

class FileLoaderUtilTest {

    @Test
    fun shouldReadFileAndReturnContentAsString() {
        val expected = "it works!"
        val actual = FileLoaderUtil.getResourceFileAsString("test_data/file_loader_util_test_file.txt")

        Assert.assertEquals(expected, actual)
    }

    @Test
    fun shouldReturnEmptyStringWhenOpeningNonExistingFile() {
        val expected = ""
        val actual = FileLoaderUtil.getResourceFileAsString("invalid_path_to_file.txt")

        Assert.assertEquals(expected, actual)
    }
}

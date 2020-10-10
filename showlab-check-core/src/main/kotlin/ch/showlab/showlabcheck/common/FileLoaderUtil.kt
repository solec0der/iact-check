package ch.showlab.showlabcheck.common

import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import java.nio.charset.StandardCharsets
import java.util.stream.Collectors

object FileLoaderUtil {
    fun getResourceFileAsString(fileName: String): String {
        return try {
            val reader = BufferedReader(InputStreamReader(
                    getResourceFileAsInputStream(fileName),
                    StandardCharsets.UTF_8.displayName())
            )
            reader.lines().collect(Collectors.joining(System.lineSeparator()))
        } catch (exception: Exception) {
            ""
        }
    }

    private fun getResourceFileAsInputStream(fileName: String): InputStream {
        val classLoader = FileLoaderUtil::class.java.classLoader
        return classLoader.getResourceAsStream(fileName)
    }
}

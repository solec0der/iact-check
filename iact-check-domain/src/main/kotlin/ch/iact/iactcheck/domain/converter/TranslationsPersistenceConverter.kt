package ch.iact.iactcheck.domain.converter

import ch.iact.iactcheck.domain.model.common.Translations
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import javax.persistence.AttributeConverter
import javax.persistence.Converter

@Converter(autoApply = true)
class TranslationsPersistenceConverter : AttributeConverter<Translations, String?> {

    private val objectMapper = jacksonObjectMapper()

    override fun convertToDatabaseColumn(translations: Translations?): String? {
        if (translations != null) {
            return objectMapper.writeValueAsString(translations.toMap())
        }
        return null
    }

    override fun convertToEntityAttribute(translations: String?): Translations? {
        if (translations == null) {
            return null
        }

        val translationsMap: Map<String, String> = objectMapper.readValue(translations)
        return Translations.fromMap(translationsMap)
    }
}

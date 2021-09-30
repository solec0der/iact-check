package ch.iact.iactcheck.domain.model.common

import ch.iact.iactcheck.domain.model.Language

data class Translations(val translations: Map<Language, String>) {

    companion object {
        const val MISSING_TRANSLATION_MESSAGE = "Missing translation"

        fun fromMap(translationMap: Map<String, String>): Translations {
            val translations = HashMap<Language, String>()

            translationMap.entries.forEach { translations[Language.findLanguageByLocale(it.key)] = it.value }

            return Translations(translations)
        }
    }

    fun get(language: Language): String = translations[language] ?: MISSING_TRANSLATION_MESSAGE

    fun toMap(): Map<String, String> = translations.entries.associateBy({ it.key.locale }, { it.value })
}

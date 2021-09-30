package ch.iact.iactcheck.domain.model

enum class Language(val locale: String) {
    GERMAN("de-CH"),
    ENGLISH("en-US"),
    FRENCH("fr-CH"),
    ITALIAN("it-CH");

    companion object {
        fun findLanguageByLocale(locale: String): Language {
            return values().find { it.locale == locale }!!;
        }
    }
}

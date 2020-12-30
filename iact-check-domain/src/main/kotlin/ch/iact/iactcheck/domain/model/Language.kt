package ch.iact.iactcheck.domain.model

enum class Language(val locale: String) {
    GERMAN("de-CH"),
    ENGLISH("en-US");

    companion object {
        fun findLanguageByLocale(locale: String): Language {
            return values().find { it.locale == locale }!!;
        }
    }
}

package ch.iact.iactcheck.dto

data class CheckDTO(
    val id: Long,
    val customerId: Long,
    val title: Map<String, String>,
    val subtitle: Map<String, String>,
    val requiredLanguages: Set<LanguageDTO>,
    val defaultLanguage: LanguageDTO,
    val questionCategories: List<QuestionCategoryDTO>,
    val marketplaceConfig: MarketplaceConfigDTO?,
    val introductionSlideConfiguration: IntroductionSlideConfigurationDTO,
    val emailSubject: Map<String, String>,
    val emailMessage: Map<String, String>,
    val textMessage: Map<String, String>
)

package ch.iact.iactcheck.service.converter

import ch.iact.iactcheck.domain.model.Check
import ch.iact.iactcheck.domain.model.IntroductionSlideConfiguration
import ch.iact.iactcheck.dto.CheckDTO
import ch.iact.iactcheck.dto.IntroductionSlideConfigurationDTO
import ch.iact.iactcheck.dto.LanguageDTO

object CheckConverter {

    fun convertCheckToDTO(check: Check): CheckDTO {
        return CheckDTO(
            id = check.id,
            customerId = check.customer.id,
            title = check.title.toMap(),
            subtitle = check.subtitle.toMap(),
            requiredLanguages = check.requiredLanguages.map { LanguageDTO(it.name, it.locale) }.toSet(),
            defaultLanguage = LanguageDTO(check.defaultLanguage.name, check.defaultLanguage.locale),
            activeFrom = check.activeFrom,
            activeTo = check.activeTo,
            questionCategories = check.questionCategories.map {
                QuestionCategoryConverter.convertQuestionCategoryToDTO(it)
            }.toList(),
            marketplaceConfig = MarketplaceConfigMapper.map(check.marketplaceConfig!!),
            introductionSlideConfiguration = map(check.introductionSlideConfiguration!!)
        )
    }

    private fun map(introductionSlideConfiguration: IntroductionSlideConfiguration): IntroductionSlideConfigurationDTO {
        return IntroductionSlideConfigurationDTO(
            showIntroductionSlide = introductionSlideConfiguration.showIntroductionSlide,
            title = introductionSlideConfiguration.title,
            subtitle = introductionSlideConfiguration.subtitle,
            text = introductionSlideConfiguration.text
        )
    }
}

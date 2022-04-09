package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.CheckNotFoundException
import ch.iact.iactcheck.controller.exception.CustomerNotFoundException
import ch.iact.iactcheck.domain.model.*
import ch.iact.iactcheck.domain.model.common.Translations
import ch.iact.iactcheck.domain.repository.CheckRepository
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.domain.repository.MarketplaceConfigRepository
import ch.iact.iactcheck.dto.CheckDTO
import ch.iact.iactcheck.service.converter.CheckConverter
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class CheckService(
    private val checkRepository: CheckRepository,
    private val customerRepository: CustomerRepository,
    private val marketplaceConfigRepository: MarketplaceConfigRepository
) {

    @Transactional
    fun createCheck(checkDTO: CheckDTO): CheckDTO {
        val customer = customerRepository
            .findById(checkDTO.customerId)
            .orElseThrow { throw CustomerNotFoundException() }

        var check = Check(
            id = -1,
            customer = customer,
            title = Translations.fromMap(checkDTO.title),
            subtitle = Translations.fromMap(checkDTO.subtitle),
            requiredLanguages = checkDTO.requiredLanguages.map {
                Language.findLanguageByLocale(it.locale)
            }.toSet(),
            defaultLanguage = Language.findLanguageByLocale(checkDTO.defaultLanguage.locale),
            questionCategories = emptyList(),
            submissions = emptyList(),
            marketplaceConfig = null,
            introductionSlideConfiguration = null,
            emailSubject = Translations.fromMap(checkDTO.emailSubject),
            emailMessage = Translations.fromMap(checkDTO.emailMessage),
            textMessage = Translations.fromMap(checkDTO.textMessage)
        )

        check = checkRepository.save(check)

        var marketplaceConfig = MarketplaceConfig(
            id = -1,
            marketplaceEnabled = false,
            marketplaceTileConfigs = emptyList(),
            greetingText = "<greeting_text>",
            marketplaceTitle = "<marketplace_title>",
            marketplaceSubtitle = "<marketplace_subtitle>",
            check = check,
            finalMarketplaceSlideConfiguration = null
        )

        marketplaceConfig = marketplaceConfigRepository.save(marketplaceConfig)

        check = check.copy(
            marketplaceConfig = marketplaceConfig.copy(
                finalMarketplaceSlideConfiguration = FinalMarketplaceSlideConfiguration(
                    id = -1,
                    showFinalSlide = false,
                    marketplaceConfig = marketplaceConfig
                )
            ),
            introductionSlideConfiguration = IntroductionSlideConfiguration(
                id = -1,
                showIntroductionSlide = checkDTO.introductionSlideConfiguration.showIntroductionSlide,
                title = checkDTO.introductionSlideConfiguration.title,
                subtitle = checkDTO.introductionSlideConfiguration.subtitle,
                text = checkDTO.introductionSlideConfiguration.text,
                check = check
            )
        )

        return CheckConverter.convertCheckToDTO(checkRepository.save(check))
    }

    fun getChecksByCustomerId(customerId: Long): List<CheckDTO> {
        val customers = checkRepository.findAllByCustomerId(customerId)

        return customers.map {
            CheckConverter.convertCheckToDTO(it)
        }.toList()
    }

    fun getCheckById(checkId: Long): CheckDTO {
        return CheckConverter.convertCheckToDTO(
            checkRepository.findById(checkId).orElseThrow { throw CheckNotFoundException() }
        )
    }

    fun updateCheckById(checkId: Long, checkDTO: CheckDTO): CheckDTO {
        var check = checkRepository.findById(checkId).orElseThrow { throw CheckNotFoundException() }

        val introductionSlideConfiguration = IntroductionSlideConfiguration(
            id = -1,
            showIntroductionSlide = checkDTO.introductionSlideConfiguration.showIntroductionSlide,
            title = checkDTO.introductionSlideConfiguration.title,
            subtitle = checkDTO.introductionSlideConfiguration.subtitle,
            text = checkDTO.introductionSlideConfiguration.text,
            check = check
        )

        check = check.copy(
            title = Translations.fromMap(checkDTO.title),
            subtitle = Translations.fromMap(checkDTO.subtitle),
            requiredLanguages = checkDTO.requiredLanguages.map {
                Language.findLanguageByLocale(it.locale)
            }.toSet(),
            defaultLanguage = Language.findLanguageByLocale(checkDTO.defaultLanguage.locale),
            introductionSlideConfiguration = introductionSlideConfiguration,
            emailSubject = Translations.fromMap(checkDTO.emailSubject),
            emailMessage = Translations.fromMap(checkDTO.emailMessage),
            textMessage = Translations.fromMap(checkDTO.textMessage)
        )

        return CheckConverter.convertCheckToDTO(checkRepository.save(check))
    }

    @Transactional
    fun deleteCheckById(checkId: Long) {
        checkRepository.deleteById(checkId)
    }
}

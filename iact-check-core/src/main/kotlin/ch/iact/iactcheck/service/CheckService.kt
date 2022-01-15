package ch.iact.iactcheck.service

import ch.iact.iactcheck.controller.exception.CheckNotFoundException
import ch.iact.iactcheck.controller.exception.CustomerNotFoundException
import ch.iact.iactcheck.controller.exception.FromDateAfterToDateException
import ch.iact.iactcheck.domain.model.*
import ch.iact.iactcheck.domain.model.common.Translations
import ch.iact.iactcheck.domain.repository.CheckRepository
import ch.iact.iactcheck.domain.repository.CustomerRepository
import ch.iact.iactcheck.dto.CheckDTO
import ch.iact.iactcheck.service.converter.CheckConverter
import org.springframework.stereotype.Service

@Service
class CheckService(
    private val checkRepository: CheckRepository,
    private val customerRepository: CustomerRepository
) {

    fun createCheck(checkDTO: CheckDTO): CheckDTO {
        if (checkDTO.activeFrom.isAfter(checkDTO.activeTo)) {
            throw FromDateAfterToDateException()
        }

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
            activeFrom = checkDTO.activeFrom,
            activeTo = checkDTO.activeTo,
            questionCategories = emptyList(),
            submissions = emptyList(),
            marketplaceConfig = null,
            introductionSlideConfiguration = null
        )

        val marketplaceConfig = MarketplaceConfig(
            id = -1,
            marketplaceEnabled = false,
            marketplaceTileConfigs = emptyList(),
            greetingText = "<greeting_text>",
            marketplaceTitle = "<marketplace_title>",
            marketplaceSubtitle = "<marketplace_subtitle>",
            check = check,
            finalMarketplaceSlideConfiguration = null
        )

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
                showIntroductionSlide = false,
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
        if (checkDTO.activeFrom.isAfter(checkDTO.activeTo)) {
            throw FromDateAfterToDateException()
        }

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
            activeFrom = checkDTO.activeFrom,
            activeTo = checkDTO.activeTo,
            introductionSlideConfiguration = introductionSlideConfiguration
        )

        return CheckConverter.convertCheckToDTO(checkRepository.save(check))
    }

    fun deleteCheckById(checkId: Long) {
        checkRepository.deleteById(checkId)
    }
}

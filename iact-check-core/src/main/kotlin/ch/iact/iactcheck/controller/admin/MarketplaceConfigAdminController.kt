package ch.iact.iactcheck.controller.admin

import ch.iact.iactcheck.dto.MarketplaceConfigDTO
import ch.iact.iactcheck.service.MarketplaceConfigService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/checks")
internal class MarketplaceConfigAdminController(private val marketplaceConfigService: MarketplaceConfigService) {

    @PutMapping("/{checkId}/marketplace-config")
    fun updateMarketplaceConfigForCheck(@PathVariable("checkId") checkId: Long, @RequestBody marketplaceConfig: MarketplaceConfigDTO): MarketplaceConfigDTO {
        return marketplaceConfigService.updateMarketplaceConfigForCheck(checkId, marketplaceConfig)
    }
}

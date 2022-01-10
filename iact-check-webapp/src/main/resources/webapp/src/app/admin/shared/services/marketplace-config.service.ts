import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarketplaceConfigDTO } from '../../../shared/dtos/marketplace-config-dto';
import { Observable } from 'rxjs';
import { CORE_URL } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class MarketplaceConfigService {
  constructor(private readonly httpClient: HttpClient) {}

  public updateMarketplaceConfigForCheck(
    checkId: number,
    marketplaceConfig: MarketplaceConfigDTO
  ): Observable<MarketplaceConfigDTO> {
    const body = JSON.stringify(marketplaceConfig);
    return this.httpClient.put<MarketplaceConfigDTO>(
      `${CORE_URL}/api/admin/checks/${checkId}/marketplace-config`,
      body
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CheckDTO } from '../../../../../../shared/dtos/check-dto';
import { DocumentService } from '../../../../../../shared/services/document.service';
import { DocumentGroupDTO } from '../../../../../../shared/dtos/document-group-dto';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceConfigService } from '../../../../../shared/services/marketplace-config.service';
import { MarketplaceConfigDTO } from '../../../../../../shared/dtos/marketplace-config-dto';
import { SnackBarService } from '../../../../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-marketplace-config',
  templateUrl: './marketplace-config.component.html',
  styleUrls: ['./marketplace-config.component.scss'],
})
export class MarketplaceConfigComponent implements OnInit {
  @Input('check') public check!: CheckDTO;

  private _availableDocumentGroups!: DocumentGroupDTO[];
  private _marketplaceConfigFormGroup!: FormGroup;
  private _marketplaceTileConfigsFormArray!: FormArray;

  constructor(
    private readonly documentService: DocumentService,
    private readonly snackbarService: SnackBarService,
    private readonly marketplaceConfigService: MarketplaceConfigService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public save(): void {
    const marketplaceConfig: MarketplaceConfigDTO = {
      marketplaceEnabled: this.marketplaceConfigFormGroup.value.marketplaceEnabled,
      marketplaceTileConfigs: this.marketplaceTileConfigsFormArray.controls.map((marketplaceTileConfigFormGroup) => {
        return {
          displayedDocumentGroups: marketplaceTileConfigFormGroup.value.displayedDocumentGroups,
          tileTitle: marketplaceTileConfigFormGroup.value.tileTitle,
          tileIcon: marketplaceTileConfigFormGroup.value.tileIcon,
          documentGroupListTitle: marketplaceTileConfigFormGroup.value.documentGroupListTitle,
          documentGroupListSubtitle: marketplaceTileConfigFormGroup.value.documentGroupListSubtitle,
          documentGroupsTilesPerRow: marketplaceTileConfigFormGroup.value.documentGroupsTilesPerRow,
          documentGroupsDisplayType: marketplaceTileConfigFormGroup.value.documentGroupsDisplayType,
          documentsTableColumnName: marketplaceTileConfigFormGroup.value.documentsTableColumnName,
        };
      }),
    };
    this.marketplaceConfigService
      .updateMarketplaceConfigForCheck(<number>this.check.id, marketplaceConfig)
      .subscribe((marketplaceConfig) => {
        this.check.marketplaceConfig = marketplaceConfig;
        this.snackbarService.open('Die Marktplatz Konfiguration wurde erfolgreich gespeichert.');
      });
  }

  public addNewMarketplaceTileConfigFormGroup(): void {
    this.marketplaceTileConfigsFormArray.push(
      new FormGroup({
        displayedDocumentGroups: new FormControl([], Validators.required),
        tileTitle: new FormControl('', Validators.required),
        tileIcon: new FormControl('', Validators.required),
        documentGroupListTitle: new FormControl('', Validators.required),
        documentGroupListSubtitle: new FormControl('', Validators.required),
        documentGroupsDisplayType: new FormControl('TILES', Validators.required),
        documentGroupsTilesPerRow: new FormControl(1),
        documentsTableColumnName: new FormControl('', Validators.required),
      })
    );
  }

  private loadData(): void {
    this.documentService.getDocumentGroupsByCheckId(<number>this.check.id).subscribe((documentGroups) => {
      this._availableDocumentGroups = documentGroups;
      this.createMarketplaceConfigFormGroup();
    });
  }

  private createMarketplaceConfigFormGroup(): void {
    const marketplaceConfig = this.check.marketplaceConfig;

    this._marketplaceConfigFormGroup = new FormGroup({
      marketplaceEnabled: new FormControl(marketplaceConfig?.marketplaceEnabled),
    });

    const formGroups: FormGroup[] = [];

    marketplaceConfig?.marketplaceTileConfigs.forEach((marketplaceTileConfig) => {
      formGroups.push(
        new FormGroup({
          displayedDocumentGroups: new FormControl(marketplaceTileConfig.displayedDocumentGroups, Validators.required),
          tileTitle: new FormControl(marketplaceTileConfig.tileTitle, Validators.required),
          tileIcon: new FormControl(marketplaceTileConfig.tileIcon, Validators.required),
          documentGroupListTitle: new FormControl(marketplaceTileConfig.documentGroupListTitle, Validators.required),
          documentGroupListSubtitle: new FormControl(
            marketplaceTileConfig.documentGroupListSubtitle,
            Validators.required
          ),
          documentGroupsDisplayType: new FormControl(
            marketplaceTileConfig.documentGroupsDisplayType,
            Validators.required
          ),
          documentGroupsTilesPerRow: new FormControl(marketplaceTileConfig.documentGroupsTilesPerRow),
          documentsTableColumnName: new FormControl(
            marketplaceTileConfig.documentsTableColumnName,
            Validators.required
          ),
        })
      );
    });

    this._marketplaceTileConfigsFormArray = new FormArray(formGroups);
  }

  get availableDocumentGroups(): DocumentGroupDTO[] {
    return this._availableDocumentGroups;
  }

  get marketplaceConfigFormGroup(): FormGroup {
    return this._marketplaceConfigFormGroup;
  }

  get marketplaceTileConfigsFormArray(): FormArray {
    return this._marketplaceTileConfigsFormArray;
  }
}

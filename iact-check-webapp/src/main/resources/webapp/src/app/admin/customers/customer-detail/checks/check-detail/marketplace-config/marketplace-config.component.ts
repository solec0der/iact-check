import { Component, Input, OnInit } from '@angular/core';
import { CheckDTO } from '../../../../../../shared/dtos/check-dto';
import { DocumentService } from '../../../../../../shared/services/document.service';
import { DocumentGroupDTO } from '../../../../../../shared/dtos/document-group-dto';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceConfigService } from '../../../../../shared/services/marketplace-config.service';
import { MarketplaceConfigDTO } from '../../../../../../shared/dtos/marketplace-config-dto';
import { SnackBarService } from '../../../../../../shared/services/snack-bar.service';
import { DisplayedDocumentGroupDTO } from '../../../../../../shared/dtos/displayed-document-group-dto';
import { MatOption } from '@angular/material/core';

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
      greetingText: this.marketplaceConfigFormGroup.value.greetingText,
      marketplaceTitle: this.marketplaceConfigFormGroup.value.marketplaceTitle,
      marketplaceSubtitle: this.marketplaceConfigFormGroup.value.marketplaceSubtitle,
      marketplaceTileConfigs: this.marketplaceTileConfigsFormArray.controls.map((marketplaceTileConfigFormGroup, index) => {
        return {
          displayedDocumentGroups: this.getDisplayedDocumentGroupsByFormArrayIndex(index),
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

  public getDocumentGroupById(documentGroupId: number): DocumentGroupDTO | undefined {
    return this._availableDocumentGroups.find((documentGroup) => documentGroup.id === documentGroupId);
  }

  public getDisplayedDocumentGroupsByFormArrayIndex(index: number): DisplayedDocumentGroupDTO[] {
    if (this.marketplaceConfig) {
      return this.marketplaceConfig?.marketplaceTileConfigs[index].displayedDocumentGroups.sort(
        (a, b) => a.position - b.position
      );
    }
    return [];
  }

  public moveDisplayedDocumentGroupUp(
    displayedDocumentGroups: DisplayedDocumentGroupDTO[],
    indexOfDocumentGroup: number
  ): void {
    if (indexOfDocumentGroup > 0) {
      const previousPosition = displayedDocumentGroups[indexOfDocumentGroup - 1].position;
      const currentPosition = displayedDocumentGroups[indexOfDocumentGroup].position;

      displayedDocumentGroups[indexOfDocumentGroup - 1].position = currentPosition;
      displayedDocumentGroups[indexOfDocumentGroup].position = previousPosition;
    }
  }

  public moveDisplayedDocumentGroupDown(
    displayedDocumentGroups: DisplayedDocumentGroupDTO[],
    indexOfDocumentGroup: number
  ): void {
    if (indexOfDocumentGroup < displayedDocumentGroups.length - 1) {
      const nextPosition = displayedDocumentGroups[indexOfDocumentGroup + 1].position;
      const currentPosition = displayedDocumentGroups[indexOfDocumentGroup].position;

      displayedDocumentGroups[indexOfDocumentGroup + 1].position = currentPosition;
      displayedDocumentGroups[indexOfDocumentGroup].position = nextPosition;
    }
  }

  public addDisplayedDocumentGroup(
    displayedDocumentGroups: DisplayedDocumentGroupDTO[],
    documentGroupId: number,
    source: MatOption
  ): void {
    if (documentGroupId) {
      const currentPosition =
        displayedDocumentGroups.length === 0 ? 0 : displayedDocumentGroups[displayedDocumentGroups.length - 1].position;

      displayedDocumentGroups.push({
        documentGroupId: documentGroupId,
        position: currentPosition + 1,
      });
      source.value = undefined;
    }
  }

  public removeDisplayedDocumentGroup(
    displayedDocumentGroups: DisplayedDocumentGroupDTO[],
    indexOfDocumentGroup: number
  ) {
    displayedDocumentGroups.splice(indexOfDocumentGroup, 1);
  }

  public getAvailableDocumentGroups(displayedDocumentGroups: DisplayedDocumentGroupDTO[]): DocumentGroupDTO[] {
    return this._availableDocumentGroups.filter((availableDocumentGroup) => {
      return !displayedDocumentGroups.some(
        (displayedDocumentGroup) => displayedDocumentGroup.documentGroupId === availableDocumentGroup.id
      );
    });
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
      greetingText: new FormControl(marketplaceConfig?.greetingText),
      marketplaceTitle: new FormControl(marketplaceConfig?.marketplaceTitle),
      marketplaceSubtitle: new FormControl(marketplaceConfig?.marketplaceSubtitle),
    });

    const formGroups: FormGroup[] = [];

    marketplaceConfig?.marketplaceTileConfigs.forEach((marketplaceTileConfig) => {
      formGroups.push(
        new FormGroup({
          marketplaceTileConfig: new FormControl(marketplaceTileConfig),
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

  get marketplaceConfigFormGroup(): FormGroup {
    return this._marketplaceConfigFormGroup;
  }

  get marketplaceTileConfigsFormArray(): FormArray {
    return this._marketplaceTileConfigsFormArray;
  }

  get marketplaceConfig(): MarketplaceConfigDTO | undefined {
    return this.check.marketplaceConfig;
  }
}

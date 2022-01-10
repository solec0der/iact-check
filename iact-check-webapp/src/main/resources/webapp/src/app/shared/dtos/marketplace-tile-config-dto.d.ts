import { DocumentGroupsDisplayType } from './document-groups-display-type';

export interface MarketplaceTileConfigDTO {
  displayedDocumentGroups: number[];
  tileTitle: string;
  tileIcon: string;
  documentGroupListTitle: string;
  documentGroupListSubtitle: string;
  documentGroupsTilesPerRow: number;
  documentGroupsDisplayType: DocumentGroupsDisplayType;
  documentsTableColumnName: string;
}

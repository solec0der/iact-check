import { DocumentGroupsDisplayType } from './document-groups-display-type';
import { DisplayedDocumentGroupDTO } from './displayed-document-group-dto';

export interface MarketplaceTileConfigDTO {
  displayedDocumentGroups: DisplayedDocumentGroupDTO[];
  tileTitle: string;
  tileIcon: string;
  documentGroupListTitle: string;
  documentGroupListSubtitle: string;
  documentGroupsTilesPerRow: number;
  documentGroupsDisplayType: DocumentGroupsDisplayType;
  documentsTableColumnName: string;
}

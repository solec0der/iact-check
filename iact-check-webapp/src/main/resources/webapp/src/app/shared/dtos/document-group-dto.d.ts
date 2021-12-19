import { DocumentDTO } from './document-dto';

export interface DocumentGroupDTO {
  id: number;
  checkId: number;
  name: string;
  backgroundColour: string;
  documents: DocumentDTO[];
}

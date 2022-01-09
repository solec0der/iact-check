import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentGroupDTO } from '../dtos/document-group-dto';
import { CORE_URL } from '../../app.config';
import { DocumentDTO } from '../dtos/document-dto';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private readonly httpClient: HttpClient) {}

  public createDocumentGroup(documentGroupDTO: DocumentGroupDTO): Observable<DocumentGroupDTO> {
    const body = JSON.stringify(documentGroupDTO);
    return this.httpClient.post<DocumentGroupDTO>(`${CORE_URL}/api/admin/document-groups`, body);
  }

  public createDocumentForDocumentGroup(documentGroupId: number, documentDTO: Document): Observable<DocumentDTO> {
    const body = JSON.stringify(documentDTO);
    return this.httpClient.post<DocumentDTO>(
      `${CORE_URL}/api/admin/document-groups/${documentGroupId}/documents`,
      body
    );
  }

  public getDocumentGroupById(documentGroupId: number): Observable<DocumentGroupDTO> {
    return this.httpClient.get<DocumentGroupDTO>(`${CORE_URL}/api/document-groups/${documentGroupId}`);
  }

  public getDocumentGroupsByCheckId(checkId: number): Observable<DocumentGroupDTO[]> {
    return this.httpClient.get<DocumentGroupDTO[]>(`${CORE_URL}/api/checks/${checkId}/document-groups`);
  }

  public updateDocumentGroupById(
    documentGroupId: number,
    documentGroupDTO: DocumentGroupDTO
  ): Observable<DocumentGroupDTO> {
    const body = JSON.stringify(documentGroupDTO);
    return this.httpClient.put<DocumentGroupDTO>(`${CORE_URL}/api/admin/document-groups/${documentGroupId}`, body);
  }

  public updateDocumentById(documentId: number, documentDTO: Document): Observable<DocumentDTO> {
    const body = JSON.stringify(documentDTO);
    return this.httpClient.put<DocumentDTO>(`${CORE_URL}/api/admin/document-groups/documents/${documentId}`, body);
  }

  public deleteDocumentGroupById(documentGroupId: number): Observable<void> {
    return this.httpClient.delete<void>(`${CORE_URL}/api/admin/document-groups/${documentGroupId}`);
  }

  public deleteDocumentById(documentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${CORE_URL}/api/admin/document-groups/documents/${documentId}`);
  }
}

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

  public createDocumentForDocumentGroup(documentGroupId: number, documentDTO: DocumentDTO): Observable<DocumentDTO> {
    const body = JSON.stringify(documentDTO);
    return this.httpClient.post<DocumentDTO>(
      `${CORE_URL}/api/admin/document-groups/${documentGroupId}/documents`,
      body
    );
  }

  public getDocumentGroupById(documentGroupId: number): Observable<DocumentGroupDTO> {
    return this.httpClient.get<DocumentGroupDTO>(`${CORE_URL}/api/document-groups/${documentGroupId}`);
  }

  public getDocumentById(documentId: number): Observable<DocumentDTO> {
    return this.httpClient.get<DocumentDTO>(`${CORE_URL}/api/admin/document-groups/documents/${documentId}`);
  }

  public getFileByDocumentId(documentId: number): Observable<Blob> {
    return this.httpClient.get(CORE_URL + '/api/documents/' + documentId + '/file', {
      responseType: 'blob',
    });
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

  public updateDocumentById(documentId: number, documentDTO: DocumentDTO): Observable<DocumentDTO> {
    const body = JSON.stringify(documentDTO);
    return this.httpClient.put<DocumentDTO>(`${CORE_URL}/api/admin/document-groups/documents/${documentId}`, body);
  }

  public updateDocuments(documents: DocumentDTO[]): Observable<DocumentDTO[]> {
    const body = JSON.stringify(documents);
    return this.httpClient.put<DocumentDTO[]>(`${CORE_URL}/api/admin/document-groups/documents`, body);
  }

  public uploadFileForDocument(documentId: number, file: File): Observable<void> {
    const body: FormData = new FormData();
    body.append('file', file, file.name);
    return this.httpClient.put<void>(CORE_URL + '/api/admin/document-groups/documents/' + documentId + '/assets', body);
  }

  public deleteDocumentGroupById(documentGroupId: number): Observable<void> {
    return this.httpClient.delete<void>(`${CORE_URL}/api/admin/document-groups/${documentGroupId}`);
  }

  public deleteDocumentById(documentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${CORE_URL}/api/admin/document-groups/documents/${documentId}`);
  }
}

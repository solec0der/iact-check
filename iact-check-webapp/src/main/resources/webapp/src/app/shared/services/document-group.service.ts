import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentGroupDTO } from '../dtos/document-group-dto';
import { CORE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class DocumentGroupService {
  constructor(private readonly httpClient: HttpClient) {}

  public getDocumentGroupById(documentGroupId: number): Observable<DocumentGroupDTO> {
    return this.httpClient.get<DocumentGroupDTO>(`${CORE_URL}/api/document-groups/${documentGroupId}`);
  }

  public getDocumentGroupsByCheckId(checkId: number): Observable<DocumentGroupDTO[]> {
    return this.httpClient.get<DocumentGroupDTO[]>(`${CORE_URL}/api/checks/${checkId}/document-groups`);
  }

  public deleteDocumentGroupById(documentGroupId: number): Observable<void> {
    return this.httpClient.delete<void>(`${CORE_URL}/api/admin/document-groups/${documentGroupId}`);
  }
}

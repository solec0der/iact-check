import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RangeQuestionDTO } from '../dtos/range-question-d-t-o';
import { CORE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class RangeQuestionService {
  constructor(private httpClient: HttpClient) {}

  public createRangeQuestion(
    rangeQuestionDTO: RangeQuestionDTO
  ): Observable<RangeQuestionDTO> {
    const body = JSON.stringify(rangeQuestionDTO);

    return this.httpClient.post<RangeQuestionDTO>(
      CORE_URL + '/api/admin/range-questions',
      body
    );
  }

  public getRangeQuestionById(
    rangeQuestionId: number
  ): Observable<RangeQuestionDTO> {
    return this.httpClient.get<RangeQuestionDTO>(
      CORE_URL + '/api/admin/range-questions/' + rangeQuestionId
    );
  }

  public getIconByRangeQuestionId(rangeQuestionId: number): Observable<Blob> {
    return this.httpClient.get(
      CORE_URL + '/api/range-questions/' + rangeQuestionId + '/icon',
      { responseType: 'blob' }
    );
  }

  public uploadIconByRangeQuestionId(
    rangeQuestionId: number,
    icon: File
  ): Observable<void> {
    const body: FormData = new FormData();
    body.append('icon', icon, icon.name);

    return this.httpClient.put<void>(
      CORE_URL + '/api/admin/range-questions/' + rangeQuestionId + '/icon',
      body
    );
  }

  public updateRangeQuestionById(
    rangeQuestionId: number,
    rangeQuestionDTO: RangeQuestionDTO
  ): Observable<RangeQuestionDTO> {
    const body = JSON.stringify(rangeQuestionDTO);

    return this.httpClient.put<RangeQuestionDTO>(
      CORE_URL + '/api/admin/range-questions/' + rangeQuestionId,
      body
    );
  }

  public deleteRangeQuestionById(rangeQuestionId: number): Observable<void> {
    return this.httpClient.delete<void>(
      CORE_URL + '/api/admin/range-questions/' + rangeQuestionId
    );
  }
}

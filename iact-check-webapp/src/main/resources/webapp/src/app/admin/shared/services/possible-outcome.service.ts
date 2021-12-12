import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CORE_URL } from '../../../app.config';
import { PossibleOutcomeDTO } from '../../../shared/dtos/possible-outcome-dto';

@Injectable({
  providedIn: 'root',
})
export class PossibleOutcomeService {
  constructor(private httpClient: HttpClient) {}

  public createPossibleOutcome(possibleOutcomeDTO: PossibleOutcomeDTO): Observable<PossibleOutcomeDTO> {
    const body = JSON.stringify(possibleOutcomeDTO);
    return this.httpClient.post<PossibleOutcomeDTO>(CORE_URL + '/api/admin/possible-outcomes', body);
  }

  public getPossibleOutcomeById(possibleOutcomeId: number): Observable<PossibleOutcomeDTO> {
    return this.httpClient.get<PossibleOutcomeDTO>(CORE_URL + '/api/admin/possible-outcomes/' + possibleOutcomeId);
  }

  public getPossibleOutcomesByScoreAndQuestionCategoryId(
    score: number,
    questionCategoryId: number
  ): Observable<PossibleOutcomeDTO[]> {
    return this.httpClient.get<PossibleOutcomeDTO[]>(
      CORE_URL + '/api/possible-outcomes?score=' + score + '&question-category-id=' + questionCategoryId
    );
  }

  public getPossibleOutcomeBySubmissionIdAndQuestionCategoryId(
    submissionId: number,
    questionCategoryId: number
  ): Observable<PossibleOutcomeDTO> {
    return this.httpClient.get<PossibleOutcomeDTO>(
      CORE_URL + '/api/submissions/' + submissionId + '/possible-outcomes?question-category-id=' + questionCategoryId
    );
  }

  public getThumbnailByPossibleOutcomeId(possibleOutcomeId: number): Observable<Blob> {
    return this.httpClient.get(CORE_URL + '/api/possible-outcomes/' + possibleOutcomeId + '/thumbnail', {
      responseType: 'blob',
    });
  }

  public getPdfByPossibleOutcomeId(possibleOutcomeId: number): Observable<Blob> {
    return this.httpClient.get(CORE_URL + '/api/possible-outcomes/' + possibleOutcomeId + '/pdf', {
      responseType: 'blob',
    });
  }

  public updatePossibleOutcomeById(
    possibleOutcomeId: number,
    possibleOutcomeDTO: PossibleOutcomeDTO
  ): Observable<PossibleOutcomeDTO> {
    const body = JSON.stringify(possibleOutcomeDTO);
    return this.httpClient.put<PossibleOutcomeDTO>(
      CORE_URL + '/api/admin/possible-outcomes/' + possibleOutcomeId,
      body
    );
  }

  public uploadAdditionalAssetsByPossibleOutcomeId(
    possibleOutcomeId: number,
    thumbnail: File,
    pdf: File
  ): Observable<void> {
    const body: FormData = new FormData();
    body.append('thumbnail', thumbnail, thumbnail.name);
    body.append('pdf', pdf, pdf.name);

    return this.httpClient.put<void>(CORE_URL + '/api/admin/possible-outcomes/' + possibleOutcomeId + '/assets', body);
  }

  public deletePossibleOutcomeById(possibleOutcomeId: number): Observable<void> {
    return this.httpClient.delete<void>(CORE_URL + '/api/admin/possible-outcomes/' + possibleOutcomeId);
  }
}

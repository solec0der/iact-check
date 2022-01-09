import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlashCardQuestionDTO } from '../dtos/flash-card-question-dto';
import { CORE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class FlashCardService {
  constructor(private readonly httpClient: HttpClient) {}

  public createFlashCardQuestion(flashCardQuestion: FlashCardQuestionDTO): Observable<FlashCardQuestionDTO> {
    const body = JSON.stringify(flashCardQuestion);
    return this.httpClient.post<FlashCardQuestionDTO>(`${CORE_URL}/api/admin/flash-card-questions`, body);
  }

  public getFlashCardQuestionById(flashCardQuestionId: number): Observable<FlashCardQuestionDTO> {
    return this.httpClient.get<FlashCardQuestionDTO>(
      `${CORE_URL}/api/admin/flash-card-questions/${flashCardQuestionId}`
    );
  }

  public getFlashCardQuestionsByCheckId(checkId: number): Observable<FlashCardQuestionDTO[]> {
    return this.httpClient.get<FlashCardQuestionDTO[]>(`${CORE_URL}/api/checks/${checkId}/flash-card-questions`);
  }

  public updateFlashCardQuestionById(
    flashCardQuestionId: number,
    flashCardQuestion: FlashCardQuestionDTO
  ): Observable<FlashCardQuestionDTO> {
    const body = JSON.stringify(flashCardQuestion);
    return this.httpClient.put<FlashCardQuestionDTO>(
      `${CORE_URL}/api/admin/flash-card-questions/${flashCardQuestionId}`,
      body
    );
  }

  public deleteFlashCardQuestionById(flashCardQuestionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${CORE_URL}/api/admin/flash-card-questions/${flashCardQuestionId}`);
  }
}

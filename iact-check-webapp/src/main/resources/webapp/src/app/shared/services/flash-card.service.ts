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

  public getFlashCardQuestionsByCheckId(checkId: number): Observable<FlashCardQuestionDTO[]> {
    return this.httpClient.get<FlashCardQuestionDTO[]>(`${CORE_URL}/api/checks/${checkId}/flash-card-questions`);
  }
}

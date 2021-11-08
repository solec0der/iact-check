import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionCategoryDTO } from '../../../shared/dtos/question-category-dto';
import { CORE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class QuestionCategoryService {
  constructor(private httpClient: HttpClient) {}

  public createQuestionCategory(
    questionCategoryDTO: QuestionCategoryDTO
  ): Observable<QuestionCategoryDTO> {
    const body = JSON.stringify(questionCategoryDTO);
    return this.httpClient.post<QuestionCategoryDTO>(
      CORE_URL + '/api/admin/question-categories',
      body
    );
  }

  public getQuestionCategoryById(
    questionCategoryId: number
  ): Observable<QuestionCategoryDTO> {
    return this.httpClient.get<QuestionCategoryDTO>(
      CORE_URL + '/api/admin/question-categories/' + questionCategoryId
    );
  }

  public getThumbnailByQuestionCategoryId(
    questionCategoryId: number
  ): Observable<Blob> {
    return this.httpClient.get(
      CORE_URL +
        '/api/question-categories/' +
        questionCategoryId +
        '/thumbnail',
      { responseType: 'blob' }
    );
  }

  public uploadThumbnailByQuestionCategoryId(
    questionCategoryId: number,
    thumbnail: File
  ): Observable<void> {
    const body: FormData = new FormData();
    body.append('thumbnail', thumbnail, thumbnail.name);

    return this.httpClient.put<void>(
      CORE_URL +
        '/api/admin/question-categories/' +
        questionCategoryId +
        '/thumbnail',
      body
    );
  }

  public updateQuestionCategoryById(
    questionCategoryId: number,
    questionCategoryDTO: QuestionCategoryDTO
  ): Observable<QuestionCategoryDTO> {
    const body = JSON.stringify(questionCategoryDTO);

    return this.httpClient.put<QuestionCategoryDTO>(
      CORE_URL + '/api/admin/question-categories/' + questionCategoryId,
      body
    );
  }

  public deleteQuestionCategoryById(
    questionCategoryId: number
  ): Observable<void> {
    return this.httpClient.delete<void>(
      CORE_URL + '/api/admin/question-categories/' + questionCategoryId
    );
  }
}

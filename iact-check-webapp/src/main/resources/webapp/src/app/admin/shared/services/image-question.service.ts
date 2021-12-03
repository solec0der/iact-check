import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageQuestionDTO } from '../../../shared/dtos/image-question-dto';
import { Observable } from 'rxjs';
import { CORE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ImageQuestionService {
  constructor(private readonly httpClient: HttpClient) {}

  public createImageQuestion(imageQuestionDTO: ImageQuestionDTO): Observable<ImageQuestionDTO> {
    const body = JSON.stringify(imageQuestionDTO);
    return this.httpClient.post<ImageQuestionDTO>(`${CORE_URL}/api/admin/image-questions`, body);
  }

  public getImageQuestionById(imageQuestionId: number): Observable<ImageQuestionDTO> {
    return this.httpClient.get<ImageQuestionDTO>(`${CORE_URL}/api/admin/image-questions/${imageQuestionId}`);
  }

  public updateImageQuestionById(
    imageQuestionId: number,
    imageQuestionDTO: ImageQuestionDTO
  ): Observable<ImageQuestionDTO> {
    const body = JSON.stringify(imageQuestionDTO);
    return this.httpClient.put<ImageQuestionDTO>(`${CORE_URL}/api/admin/image-questions/${imageQuestionId}`, body);
  }

  public uploadImageForImageQuestion(imageQuestionId: number, image: File): Observable<void> {
    const body: FormData = new FormData();
    body.append('image', image, image.name);

    return this.httpClient.put<void>(`${CORE_URL}/api/admin/image-questions/${imageQuestionId}`, body);
  }

  public deleteImageQuestionById(imageQuestionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${CORE_URL}/api/admin/image-questions/${imageQuestionId}`);
  }
}

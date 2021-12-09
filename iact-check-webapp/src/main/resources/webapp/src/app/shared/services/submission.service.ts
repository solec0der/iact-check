import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubmissionDTO } from '../dtos/submission-dto';
import { Observable } from 'rxjs';
import { CORE_URL } from '../../app.config';
import { RangeQuestionAnswerDTO } from '../dtos/range-question-answer-dto';
import { BookmarkedPossibleOutcomeDTO } from '../dtos/bookmarked-possible-outcome-dto';
import { ImageQuestionAnswerDTO } from '../dtos/image-question-answer-dto';
import { ScoreDTO } from '../dtos/score-dto';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private httpClient: HttpClient) {}

  public createSubmission(submission: SubmissionDTO): Observable<SubmissionDTO> {
    const body = JSON.stringify(submission);
    return this.httpClient.post<SubmissionDTO>(CORE_URL + '/api/submissions', body);
  }

  public addRangeQuestionAnswersToSubmission(
    submissionId: number,
    rangeQuestionAnswers: RangeQuestionAnswerDTO[]
  ): Observable<SubmissionDTO> {
    const body = JSON.stringify(rangeQuestionAnswers);
    return this.httpClient.put<SubmissionDTO>(
      CORE_URL + '/api/submissions/' + submissionId + '/range-question-answers',
      body
    );
  }

  public addImageQuestionAnswersToSubmission(
    submissionId: number,
    imageQuestionAnswers: ImageQuestionAnswerDTO[]
  ): Observable<SubmissionDTO> {
    const body = JSON.stringify(imageQuestionAnswers);
    return this.httpClient.put<SubmissionDTO>(
      CORE_URL + '/api/submissions/' + submissionId + '/image-question-answers',
      body
    );
  }

  public addBookmarkedPossibleOutcomesToSubmission(
    submissionId: number,
    bookmarkedPossibleOutcomes: BookmarkedPossibleOutcomeDTO[]
  ): Observable<SubmissionDTO> {
    const body = JSON.stringify(bookmarkedPossibleOutcomes);
    return this.httpClient.put<SubmissionDTO>(
      CORE_URL + '/api/submissions/' + submissionId + '/bookmarked-possible-outcomes',
      body
    );
  }

  public getScoresGroupedByQuestionCategoryId(submissionId: number): Observable<ScoreDTO[]> {
    return this.httpClient.get<ScoreDTO[]>(CORE_URL + '/api/submissions/' + submissionId + '/scores');
  }
}

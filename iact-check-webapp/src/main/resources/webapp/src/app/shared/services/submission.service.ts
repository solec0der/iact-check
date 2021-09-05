import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubmissionDTO } from '../dtos/submission-dto';
import { Observable } from 'rxjs';
import { CORE_URL } from '../../app.config';
import { RangeQuestionAnswerDTO } from '../dtos/range-question-answer-dto';
import { BookmarkedPossibleOutcomeDTO } from '../dtos/bookmarked-possible-outcome-dto';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private httpClient: HttpClient) {}

  public createSubmission(
    submission: SubmissionDTO
  ): Observable<SubmissionDTO> {
    const body = JSON.stringify(submission);
    return this.httpClient.post<SubmissionDTO>(
      CORE_URL + '/api/submissions',
      body
    );
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

  public addBookmarkedPossibleOutcomesToSubmission(
    submissionId: number,
    bookmarkedPossibleOutcomes: BookmarkedPossibleOutcomeDTO[]
  ): Observable<SubmissionDTO> {
    const body = JSON.stringify(bookmarkedPossibleOutcomes);
    return this.httpClient.put<SubmissionDTO>(
      CORE_URL +
        '/api/submissions/' +
        submissionId +
        '/bookmarked-possible-outcomes',
      body
    );
  }
}

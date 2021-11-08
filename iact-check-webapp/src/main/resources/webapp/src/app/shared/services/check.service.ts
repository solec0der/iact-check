import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckDTO } from '../dtos/check-dto';
import { CORE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class CheckService {
  constructor(private httpClient: HttpClient) {}

  public createCheck(checkDTO: CheckDTO): Observable<CheckDTO> {
    const body = JSON.stringify(checkDTO);
    return this.httpClient.post<CheckDTO>(
      CORE_URL + '/api/admin/checks/',
      body
    );
  }

  public getCheckById(checkId: number): Observable<CheckDTO> {
    return this.httpClient.get<CheckDTO>(
      CORE_URL + '/api/admin/checks/' + checkId
    );
  }

  public getChecksByCustomerId(customerId: number): Observable<CheckDTO[]> {
    return this.httpClient.get<CheckDTO[]>(
      CORE_URL + '/api/customers/' + customerId + '/checks'
    );
  }

  public updateCheckById(
    checkId: number,
    checkDTO: CheckDTO
  ): Observable<CheckDTO> {
    const body = JSON.stringify(checkDTO);
    return this.httpClient.put<CheckDTO>(
      CORE_URL + '/api/admin/checks/' + checkId,
      body
    );
  }

  public deleteCheckById(checkId: number): Observable<void> {
    return this.httpClient.delete<void>(
      CORE_URL + '/api/admin/checks/' + checkId
    );
  }
}

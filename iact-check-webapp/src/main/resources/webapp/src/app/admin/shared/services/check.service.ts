import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckDTO } from '../dtos/check-dto';
import { CORE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class CheckService {
  constructor(private httpClient: HttpClient) {}

  public getChecksByCustomerId(customerId: number): Observable<CheckDTO[]> {
    return this.httpClient.get<CheckDTO[]>(
      CORE_URL + '/api/customers/' + customerId + '/checks'
    );
  }
}

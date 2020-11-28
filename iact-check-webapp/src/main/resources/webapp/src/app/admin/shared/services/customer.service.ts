import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../dtos/customer-dto';
import { CORE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  public getCustomers(): Observable<CustomerDTO[]> {
    return this.httpClient.get<CustomerDTO[]>(
      CORE_URL + '/api/admin/customers'
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {CustomerDTO} from "../dtos/customer-dto";

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  public getCustomers(): Observable<CustomerDTO[]> {
    return this.httpClient.get<CustomerDTO[]>('http://localhost:9999/iact-check-core/api/admin/customers');
  }
}

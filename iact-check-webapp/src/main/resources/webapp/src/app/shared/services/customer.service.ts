import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../dtos/customer-dto';
import { CORE_URL } from '../../app.config';
import { ActiveCustomerService } from '../../admin/shared/services/active-customer.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient, private activeCustomerService: ActiveCustomerService) {}

  public createCustomer(customerDTO: CustomerDTO): Observable<CustomerDTO> {
    const body = JSON.stringify(customerDTO);
    return this.httpClient.post<CustomerDTO>(CORE_URL + '/api/admin/customers', body);
  }

  public setActiveCustomerIfNotSet(customerId: number): void {
    this.activeCustomerService
      .getActiveCustomer()
      .subscribe((activeCustomer) => {
        if ((activeCustomer && activeCustomer.id !== customerId) || !activeCustomer) {
          this.getCustomerById(customerId).subscribe((customerDTO) => {
            this.activeCustomerService.setActiveCustomer(customerDTO);
          });
        }
      })
      .unsubscribe();
  }

  public getLogoByCustomerId(customerId: number): Observable<Blob> {
    return this.httpClient.get(CORE_URL + '/api/customers/' + customerId + '/branding/logo', { responseType: 'blob' });
  }

  public getCustomerById(customerId: number): Observable<CustomerDTO> {
    return this.httpClient.get<CustomerDTO>(CORE_URL + '/api/customers/' + customerId);
  }

  public getCustomers(): Observable<CustomerDTO[]> {
    return this.httpClient.get<CustomerDTO[]>(CORE_URL + '/api/admin/customers');
  }

  public updateCustomerById(customerId: number, customerDTO: CustomerDTO): Observable<CustomerDTO> {
    const body = JSON.stringify(customerDTO);
    return this.httpClient.put<CustomerDTO>(CORE_URL + '/api/admin/customers/' + customerId, body);
  }

  public uploadLogoByCustomerId(customerId: number, logo: File): Observable<void> {
    const body: FormData = new FormData();
    body.append('logo', logo, logo.name);

    return this.httpClient.put<void>(CORE_URL + '/api/admin/customers/' + customerId + '/branding/logo', body);
  }

  public deleteCustomerById(customerId: number): Observable<void> {
    return this.httpClient.delete<void>(CORE_URL + '/api/admin/customers/' + customerId);
  }
}

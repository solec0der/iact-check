import { Injectable } from '@angular/core';
import { CustomerDTO } from '../dtos/customer-dto';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveCustomerService {
  private activeCustomer: Subject<CustomerDTO> = new Subject<CustomerDTO>();

  constructor() {}

  public setActiveCustomer(customerDTO: CustomerDTO): void {
    this.activeCustomer.next(customerDTO);
  }

  public getActiveCustomer(): Observable<CustomerDTO> {
    return this.activeCustomer.asObservable();
  }

  public unsetActiveCustomer(): void {
    this.activeCustomer.next();
  }
}

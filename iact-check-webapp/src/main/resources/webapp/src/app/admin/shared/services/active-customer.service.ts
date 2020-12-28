import { Injectable } from '@angular/core';
import { CustomerDTO } from '../dtos/customer-dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveCustomerService {
  private activeCustomer: BehaviorSubject<
    CustomerDTO | undefined
  > = new BehaviorSubject<CustomerDTO | undefined>(undefined);

  constructor() {}

  public setActiveCustomer(customerDTO: CustomerDTO): void {
    this.activeCustomer.next(customerDTO);
  }

  public getActiveCustomer(): Observable<CustomerDTO | undefined> {
    return this.activeCustomer;
  }

  public unsetActiveCustomer(): void {
    this.activeCustomer.next(undefined);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActuatorInfo } from '../dtos/actuator-info';
import { CORE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ActuatorInfoService {
  constructor(private httpClient: HttpClient) {}

  public getActuatorInfo(): Observable<ActuatorInfo> {
    return this.httpClient.get<ActuatorInfo>(CORE_URL + '/actuator/info');
  }
}

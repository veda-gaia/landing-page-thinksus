import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractedPlanService extends BaseService {
  private readonly url: string = `${environment.api.path}/contracted-plan`;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  vinculatePlan(preapproval_id: string) {
    return this.httpClient
      .put(
        `${this.url}/vinculate-plan/${preapproval_id}`,
        {},
        this.authorizedHeader()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  checkContractedPlanByUser() {
    return this.httpClient
      .get(`${this.url}/verify-contracted-by-user`,this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getByUser() {
    return this.httpClient
      .get(`${this.url}/verify-plan`,this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}

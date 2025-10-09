import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import CompanyInterface from '../interfaces/company/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseService {
  private readonly url: string = `${environment.api.path}/company`;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  list(): Observable<CompanyInterface[]> {
    return this.httpClient
      .get(`${this.url}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getById(id: string): Observable<CompanyInterface> {
    return this.httpClient
      .get(`${this.url}/id/${id}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getByUser(userId?: string): Observable<CompanyInterface> {
    return this.httpClient
      .get<CompanyInterface>(`${this.url}/get-by-user`, {
        ...this.authorizedHeader(),
        params: userId ? { userId } : {},
      })
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  buildAggregatedReportEsgResult(): Observable<any> {
    return this.httpClient
      .get(`${this.url}/build-aggregated-report`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}

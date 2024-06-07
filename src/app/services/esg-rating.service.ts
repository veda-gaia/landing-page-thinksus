import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import CompanyInterface from '../interfaces/company/company.interface';

@Injectable({
  providedIn: 'root'
})
export class EsgRatingService extends BaseService {
  private readonly url: string = `${environment.api.path}/esg-rating`;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  list(): Observable<any[]> {
    return this.httpClient
      .get(`${this.url}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getById(id: string): Observable<any> {
    return this.httpClient
      .get(`${this.url}/id/${id}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  reister(dto: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}/register`, dto, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}

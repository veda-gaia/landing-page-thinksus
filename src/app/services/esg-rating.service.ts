import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import CompanyInterface from '../interfaces/company/company.interface';
import { updateStatusDto } from '../dtos/update-status.dto';

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

  getByCompany(): Observable<any[]> {
    return this.httpClient
      .get(`${this.url}/get-by-company`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getById(id: string): Observable<any> {
    return this.httpClient
      .get(`${this.url}/id/${id}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  updateStatusById(id: string, dto: updateStatusDto): Observable<any> {
    return this.httpClient
      .put(`${this.url}/update-status/${id}`, dto, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  updateTitleById(id: string, dto: any): Observable<any> {
    return this.httpClient
      .put(`${this.url}/update-title/${id}`, dto, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  register(dto: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}/register`, dto, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  donwloadReport() {
    return this.httpClient
      .get(`${this.url}/download-report`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}

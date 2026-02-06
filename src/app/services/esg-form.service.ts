import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormInterface } from '../forms/form.interface';

@Injectable({
  providedIn: 'root',
})
export class EsgFormService extends BaseService {
  private readonly url: string = `${environment.api.path}/esg-forms`;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  getbySectionSegment(
    sectionId: string,
    segmentId: string
  ): Observable<FormInterface> {
    return this.httpClient
      .get(
        `${this.url}/get-by-sectionid/${sectionId}/${segmentId}`,
        this.authorizedHeader()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getbyId(esgFormId: string): Observable<FormInterface> {
    return this.httpClient
      .get(`${this.url}/id/${esgFormId}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}

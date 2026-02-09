import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { SectionInterface } from '../interfaces/forms/section.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SectionService extends BaseService {
  private readonly url: string = `${environment.api.path}/section`;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  list(): Observable<SectionInterface[]> {
    return this.httpClient
      .get(`${this.url}/list-section`, this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}

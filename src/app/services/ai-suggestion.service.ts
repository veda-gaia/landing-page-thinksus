import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiSuggestionService extends BaseService {
  private readonly url: string = `${environment.api.path}/ai-suggestions`;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  getByRating(esgRatingId: string): Observable<any> {
    return this.httpClient
      .get(`${this.url}/rating/${esgRatingId}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
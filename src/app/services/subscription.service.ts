import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BaseService } from "./base.service";
import { catchError, map, Observable } from "rxjs";
import SubscriptionInterface from "../interfaces/subscription/subscription.interface";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService {
  private readonly url: string = `${environment.api.path}/subscription`;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  list(): Observable<SubscriptionInterface[]> {
    return this.httpClient
      .get(`${this.url}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getById(id: string): Observable<SubscriptionInterface> {
    return this.httpClient
      .get(`${this.url}/id/${id}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
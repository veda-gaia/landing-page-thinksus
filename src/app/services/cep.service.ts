import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService extends BaseService  {
  urlBrazil: string = 'https://viacep.com.br/ws'
  urlUSA: string = 'https://viacep.com.br/ws'
  constructor(
      private readonly httpClient: HttpClient,
  ) {
      super()
  }

  getBrazilCepInfo(cep: string): Observable<any> {
    return this.httpClient
      .get(`${this.urlBrazil}/${cep}/json/`, this.anonymousHeader())
  }

  getUSACepInfo(cep: string): Observable<any> {
    return this.httpClient
      .get(`${this.urlBrazil}/${cep}/json/`, this.anonymousHeader())
  }
}

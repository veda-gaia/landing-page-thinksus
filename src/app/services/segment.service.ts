import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { SectionInterface } from '../interfaces/forms/section.interface';
import { environment } from 'src/environments/environment';
import { SegmentInterface } from '../interfaces/forms/segment.interface';
import { SegmentRegisterDto } from '../interfaces/forms/segment-register-dto';

@Injectable({
  providedIn: 'root',
})
export class SegmentService extends BaseService {
  private readonly url: string = `${environment.api.path}/segment`;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  list(): Observable<SegmentInterface[]> {
    return this.httpClient
      .get(`${this.url}/list-segment`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getbySection(
    formId: string,
    sectionId: string
  ): Observable<SegmentInterface[]> {
    return this.httpClient
      .get(`${this.url}/section/${sectionId}/${formId}`, this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  register(dto: SegmentRegisterDto): Observable<SegmentRegisterDto> {
    return this.httpClient
      .post(`${this.url}/register`, this.encrypt(dto), this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}

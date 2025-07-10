import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import {AwsS3FileInterface} from '../interfaces/aws/aws-s3-file.interface';


@Injectable({
  providedIn: 'root'
})
export class AwsService extends BaseService {
  private readonly url: string = `${environment.api.path}/aws`;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  uploadFilesS3(dto: any): Observable<AwsS3FileInterface[]> {
    return this.httpClient
      .post(`${this.url}/upload-files-s3`, dto, this.authorizedHeaderMulti())
      .pipe(
         map(this.extractData), 
         catchError(this.serviceError)
      );
  }

}

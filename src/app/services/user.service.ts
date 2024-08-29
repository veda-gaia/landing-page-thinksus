import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserActiveRequestDto } from '../interfaces/user/user-active-request.dto';
import { UserRegisterRequestDto } from '../interfaces/user/user-register-request.dto';
import { UserInterface } from '../interfaces/user/user.interface';
import { BaseService } from './base.service';
import { UserUpdateRequestDto } from '../dtos/user-update-request.dto';
import { UserResetPasswordRequestDto } from '../dtos/user-reset-password-request.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private readonly url: string = `${environment.api.path}/user`;
  private readonly authUrl: string = `${environment.api.path}/authentication`;
  private user = new BehaviorSubject<UserInterface | null>(null);

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  $user = this.user.asObservable();

  setUser(user: UserInterface | null) {
    this.user.next(user);
  }

  getUser(): UserInterface | null {
    return this.user.getValue();
  }

  refreshUser() {
    this.getUserFromApi().subscribe((user) => {
      this.setUser(user);
    });
  }

  getUserFromApi(): Observable<UserInterface> {
    return this.httpClient
      .get(`${this.authUrl}/authenticated`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError))
  }

  register(dto: UserRegisterRequestDto): Observable<UserInterface> {
    return this.httpClient
      .post(`${this.url}/register`, this.encrypt(dto), this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  activeUser(dto: UserActiveRequestDto): Observable<UserInterface> {
    return this.httpClient
      .post(`${this.url}/active`, dto, this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  list(): Observable<UserInterface[]> {
    return this.httpClient
      .get(`${this.url}/list`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getById(id: string): Observable<UserInterface> {
    return this.httpClient
      .get(`${this.url}/id/${id}`, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  update(id: string, dto: UserUpdateRequestDto): Observable<UserInterface> {
    return this.httpClient
      .put(`${this.url}/update/${id}`, this.encrypt(dto), this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  resetPasswordEmail(dto: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}/reset-password-email`, dto, this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  resetPassword(dto: UserResetPasswordRequestDto): Observable<any> {
    return this.httpClient
      .post(`${this.url}/reset-password`, this.encrypt(dto), this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}

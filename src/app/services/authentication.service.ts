import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, map } from 'rxjs';
import AuthorizationInterface, {
  LoginInterface,
} from '../interfaces/authentication/authentication.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  private readonly url: string = `${environment.api.path}/authentication`;
  private authUser = new Subject<AuthorizationInterface | null>();

  constructor(
    private readonly httpClient: HttpClient,
    private injector: Injector
  ) {
    super();
  }

  setAuthUser(user: AuthorizationInterface) {
    this.authUser.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getAuthUser(): Observable<AuthorizationInterface | null> {
    return this.authUser.asObservable();
  }

  login(dto: LoginInterface): Observable<AuthorizationInterface> {
    return this.httpClient
      .post(`${this.url}/authenticate`, this.encrypt(dto), this.anonymousHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  loginWithToken(): Observable<AuthorizationInterface> {
    return this.httpClient
      .post(`${this.url}/authenticate-with-token`, {}, this.authorizedHeader())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  logout() {
    localStorage.removeItem('user');
    this.authUser.next(null);
    const userService = this.injector.get(UserService);
    userService.setUser(null);
  }
}

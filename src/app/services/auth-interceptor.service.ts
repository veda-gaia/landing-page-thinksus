import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, of, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // private authService: AuthenticationService;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private injector: Injector
  ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    const authService = this.injector.get(AuthenticationService);

    if (err.status === 401) {
      authService.logout();
      this.toast.error('Sessão expirada, por favor faça login novamente!');
      return of();
    }
    return throwError(() => err);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((x) => this.handleAuthError(x)));
  }
}
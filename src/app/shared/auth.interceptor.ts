import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line:max-line-length
  intercept(req: import('@angular/common/http').HttpRequest<any>, next: import('@angular/common/http').HttpHandler)
    : import('rxjs')
    .Observable<import('@angular/common/http')
    .HttpEvent<any>> {

    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.authService.token
        }
      });
    }

    return next.handle(req)
      .pipe(
        catchError( error => {
          if (error.status === 401 ) {
            this.authService.logout();
            this.router.navigate(['/admin', 'login']);
          }
          return throwError(error);
        })
      );
  }
}

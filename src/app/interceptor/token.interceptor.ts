import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UtilService } from '../services/util.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = TokenService.getToken();
    const expirationTime = TokenService.isTokenExpired(token);

    if (expirationTime) {
      UtilService.logout();
      return throwError('Token has expired');
    }

    return next.handle(request);
  }
}

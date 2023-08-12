import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authAccessToken = `Bearer ${environment.apiAccessToken}`;

    const authReq = req.clone({
      headers: req.headers.set('Authorization', authAccessToken),
    });

    return next.handle(authReq);
  }
}

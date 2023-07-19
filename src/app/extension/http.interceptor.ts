import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { localStorageToken } from './local.storage';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(@Inject(localStorageToken) private localStorage: Storage) {}
  token: string | null = this.localStorage.getItem('token');
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    });
    console.log(request);
    return next.handle(request);
  }
}

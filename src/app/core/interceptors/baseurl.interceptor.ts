import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.params.get('setbaseurl') !== 'stop') {
      const baseUrl = environment.baseUrl;
      request = request.clone({ url: `${baseUrl}${request.url}` });
    }
    return next.handle(request);
  }
}

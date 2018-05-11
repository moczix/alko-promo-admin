import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  prepHeaders(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        token: this.authService.token,
        type: this.authService.type.toString()
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    /*
const secureReq = req.clone({
    url: req.url + `?token=${this.authService.getToken()}&type=${this.authService.getType()}`
    });
*/
    return next.handle(
      this.authService.token ? this.prepHeaders(req) : req
    );
  }
}

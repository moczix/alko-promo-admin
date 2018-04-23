import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {MyAuthService} from './my-auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private myAuthService: MyAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    /*
const secureReq = req.clone({
    url: req.url + `?token=${this.authService.getToken()}&type=${this.authService.getType()}`
    });
*/
    if (this.myAuthService.isDataAuth) {
      const authReq = req.clone({
        setHeaders: {
          token: this.myAuthService.getToken(),
          type: this.myAuthService.getType().toString()
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}

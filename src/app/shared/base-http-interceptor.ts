import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {environment} from '../../environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class BaseHttpInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const newReq = req.clone({
      url: environment.apiUrl + req.url
    });
    return next.handle(newReq)
      .pipe(
        tap(() => {
          },
          (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.errorService.setMessage('Nie masz uprawnień');
            } else {
              const error = err.error;
              if (typeof error === 'string') {
                this.errorService.setMessage('błąd zapytania...');
              } else {
                const message = Array.isArray(error[Object.keys(error)[0]]) ? error[Object.keys(error)[0]][0] : error[Object.keys(error)[0]];
                this.errorService.setMessage(message);
              }
            }


          }
        )
      );
  }
}

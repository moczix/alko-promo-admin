import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {environment} from '../../environments/environment';

@Injectable()
export class BaseHttpInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {
  }

  parseError(err: HttpErrorResponse) {
    if (err.status === 401) {
      return 'Nie masz uprawnień';
    }
    return typeof err.error === 'string' ? 'błąd zapytania...' : this.getFirstMessageFromErroor(err.error);
  }

  getFirstMessageFromErroor(error: any) {
    return Array.isArray(error[Object.keys(error)[0]]) ? error[Object.keys(error)[0]][0] : error[Object.keys(error)[0]]
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    let newReq = req;
    if (!req.url.includes('http') && !req.url.includes('https')) {
      newReq = req.clone({
        url: environment.apiUrl + req.url
      });
    }

    return next.handle(newReq)
      .pipe(
        tap(() => {
          },
          (err: HttpErrorResponse) => { this.errorService.setMessage(this.parseError(err)); }
        )
      );
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Observable, of} from 'rxjs';

import {AuthService} from './auth.service';
import {catchError, filter, mergeMap} from 'rxjs/internal/operators';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.authService.gapiReady()
      .pipe(
        filter(status => !!status),
        mergeMap(() => this.authService.silentSignIn()),
        catchError(err => {
            this.router.navigate(['../']);
            return of(false);
          })
      );
  }
}

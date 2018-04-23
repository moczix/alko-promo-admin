import {Injectable} from '@angular/core';
import {MyAuthService} from './my-auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private myAuthService: MyAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.myAuthService.silentAuthCheck()
      .map(signResult => {
        this.myAuthService.setAuthData(signResult.token, signResult.type);
        return true;
      })
      .catch(err => {
        this.router.navigate(['../']);
        return Observable.of(false);
      });
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angular5-social-login';
import {MyAuthService} from '../../shared/my-auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService, private myAuthService: MyAuthService, private router: Router) {
  }

  ngOnInit() {

  }

  googleSignIn() {
    Observable.fromPromise(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))
      .mergeMap(signResult => {
        return Observable.forkJoin(
          Observable.of(signResult),
          this.myAuthService.checkAuth(signResult.idToken, 666)
        );
      })
      .subscribe(success => {
          const [signResult, authRes ] = success;
          this.myAuthService.setAuthData(signResult.idToken, 666);
          this.router.navigate(['/dashboard']);
        }
      );
  }

}

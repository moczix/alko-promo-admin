import {Component, OnInit} from '@angular/core';




import {Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {filter, mergeMap} from 'rxjs/internal/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinChecked = false;


  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.gapiReady()
      .pipe(
        filter(val => !!val),
        mergeMap(() => this.authService.silentSignIn())
      )
      .subscribe(
        () => this.router.navigate(['/dashboard']),
        err => { this.signinChecked = true; }
      );
  }

  googleSignIn() {
    this.authService.signIn()
      .subscribe(() => this.router.navigate(['/dashboard']));
  }

}

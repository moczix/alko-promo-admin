
import {throwError as observableThrowError, BehaviorSubject, Observable, Subject,  of } from 'rxjs';
import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {mergeMap} from 'rxjs/internal/operators';

declare var gapi: any;


interface GoogleSignIn {
  expiresIn: number;
  expiresAt: number;
  idToken: string;
  email: string;
  image: string;
  name: string;
  id: number;
}

@Injectable()
export class AuthService {

  public token;
  public type;

  private authInstance;
  private scriptLoaded = false;

  private expired = new Subject<void>();
  private expiredIntervalId;

  private gapiReadySubject = new BehaviorSubject<boolean>(false);


  constructor(
    private http: HttpClient
  ) {
  }

  gapiReady(): Observable<boolean> {
    return this.gapiReadySubject.asObservable();
  }

  initGapi() {
    if (!this.scriptLoaded) {
      this.loadGapi().subscribe(() => {
        this.authInstance = gapi.auth2.init({
          client_id: environment.serverGoogleClientId,
          scope: 'profile'
        });
        this.scriptLoaded = true;
        this.gapiReadySubject.next(true);
      });
    }
  }

  silentSignIn() {
    return fromPromise(this.authInstance)
      .pipe(
        mergeMap(() => this.checkAuth(this.parseData(this.authInstance.currentUser.get())))
      );
  }

  signOut(): Observable<void> {
    return fromPromise(this.authInstance.signOut())
      .pipe(
        mergeMap(() => {
          clearInterval(this.expiredIntervalId);
          return of();
        })
      );
  }

  signIn() {
    return fromPromise(this.authInstance.signIn())
      .pipe(
        mergeMap(signResult => this.checkAuth(this.parseData(signResult)))
      );
  }

  parseData(googleSignInData: any): GoogleSignIn | null {
    if (googleSignInData.isSignedIn() === false) {
      return null;
    }
    return {
      email: googleSignInData.getBasicProfile().getEmail(),
      id: googleSignInData.getBasicProfile().getId(),
      image: googleSignInData.getBasicProfile().getImageUrl(),
      name: googleSignInData.getBasicProfile().getName(),
      expiresAt: googleSignInData.getAuthResponse(true).expires_at,
      expiresIn: googleSignInData.getAuthResponse(true).expires_in,
      idToken: googleSignInData.getAuthResponse(true).id_token
    };
  }

  expiredOut(): Observable<void> {
    return this.expired.asObservable();
  }

  setExpirationInterval(expiresAt: number) {
    clearInterval(this.expiredIntervalId);
    this.expiredIntervalId = setInterval(() => {
      const expiredAt = new Date(expiresAt);
      const today = new Date();
      if (today > expiredAt) {
        this.expired.next();
        clearInterval(this.expiredIntervalId);
      }
    }, 3000);
  }

  checkAuth(account: GoogleSignIn): Observable<boolean> {
    if (!account) {
      return observableThrowError(new Error());
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'token': account.idToken,
        'type': environment.tokenType.toString()
      })
    };
    return this.http.get(`/admin/checkAuth`, httpOptions)
      .pipe(
        mergeMap(() => {
          this.token = account.idToken;
          this.type = environment.tokenType.toString();
          this.setExpirationInterval(account.expiresAt);
          return of(true);
        })
      );
  }

  private loadGapi() {
    return Observable.create(observer => {
      const googleScript = document.createElement('script');
      googleScript.src = 'https://apis.google.com/js/platform.js';
      googleScript.type = 'text/javascript';
      googleScript.async = true;
      googleScript.onload = () => {
        gapi.load('auth2', () => {
          this.scriptLoaded = true;
          observer.next();
          observer.complete();
        });
      };
      document.getElementsByTagName('head')[0].appendChild(googleScript);
    });
  }


}

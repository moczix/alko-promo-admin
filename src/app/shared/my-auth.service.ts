import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MyAuthService {

  public isDataAuth = false;
  private token: string;
  private type: number;

  constructor(
    private http: HttpClient
  ) { }


  getToken() {
    return this.token;
  }

  getType() {
    return this.type;
  }


  setAuthData(token: string, type: number) {
    this.token = token;
    this.type = type;
    this.isDataAuth = true;
    localStorage.setItem('token', token);
    localStorage.setItem('type', type.toString());
  }

  silentAuthCheck(): Observable<{token: string, type: number}> {
      const token = localStorage.getItem('token') || '';
      const type = localStorage.getItem('type') || '';
      const httpOptions = {
        headers: new HttpHeaders({
          'token': token,
          'type': type
        })
      };
    return this.http.get(`/admin/checkAuth`, httpOptions)
      .flatMap(res => Observable.of({token: token, type: parseInt(type, 10)}))
  }



  checkAuth(token: string, type: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token':  token,
        'type': type.toString()
      })
    };
    return this.http.get(`/admin/checkAuth`, httpOptions);
  }

}

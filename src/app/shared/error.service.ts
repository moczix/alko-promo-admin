import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';


@Injectable()
export class ErrorService {

  private errorMessage = new Subject<string>();

  getMessage(): Observable<string> {
    return this.errorMessage.asObservable();
  }

  setMessage(message: string) {
    this.errorMessage.next(message);
  }

}

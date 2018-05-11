import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryModel, TagModel} from '../../../models';

@Injectable()
export class TagService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<TagModel>> {
    return this.http.get<Array<TagModel>>(`/admin/tags`);
  }



}

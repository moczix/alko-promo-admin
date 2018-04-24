import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CategoryModel} from '../../../models';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<CategoryModel>> {
    return this.http.get<Array<CategoryModel>>(`/admin/categories`);
  }



}

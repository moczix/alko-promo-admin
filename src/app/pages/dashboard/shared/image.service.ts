import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryModel, TagModel} from '../../../models';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {
  }

  searchImages(barcode: string) {
    return this.http.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDEGozemTANgsT_flNut-TrbF_l-D8639w&cx=016609265200087736226:cjonfap2pj8&searchType=image&q=${barcode}`);
  }



}

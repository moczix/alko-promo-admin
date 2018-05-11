import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AlcoholModel, AlcoholUpdateModel} from '../../../models';

@Injectable()
export class AlcoholService {

  public pendingAlcoholsIds: Array<number>;
  public acceptedAlcoholsIds: Array<number>;

  constructor(private http: HttpClient) {
  }

  getPendingAlcohols(): Observable<Array<AlcoholModel>> {
    return this.http.get<Array<AlcoholModel>>(`/admin/alcohols/pending`);
  }

  getAcceptedAlcohols(): Observable<Array<AlcoholModel>> {
    return this.http.get<Array<AlcoholModel>>(`/admin/alcohols/accepted`);
  }

  getAlcohol(alcoholId: number): Observable<AlcoholModel> {
    return this.http.get<AlcoholModel>(`/admin/alcohols/${alcoholId}`);
  }

  updateAlcohol(alcoholId: number, data: AlcoholUpdateModel) {
    return this.http.put(`/admin/alcohols/${alcoholId}`, data);
  }

  deleteAlcohol(alcoholId: number) {
    return this.http.delete(`/admin/alcohols/${alcoholId}`);
  }



}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { otherBackendUrl } from '../app.config';
import { map, Observable } from 'rxjs';
import { Allergy } from '../interfaces/allergy.interface';

@Injectable({
  providedIn: 'root'
})
export class AllergiesService {

  url = otherBackendUrl + '/allergies';

  constructor(private http: HttpClient) { }

  searchAllergies(params: { code?: string, name?: string, description?: string }): Observable<Allergy[]> {
    let httpParams = new HttpParams();

    if (params.code) {
      httpParams = httpParams.set('code', params.code);
    }
    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }
    if (params.description) {
      httpParams = httpParams.set('description', params.description);
    }

    return this.http.get<Allergy[]>(this.url + '/Allergy/:name', { params: httpParams });
  }

  createAllergy(allergy: Allergy): Observable<Allergy> {
    return this.http.post<Allergy>(this.url + '/createAllergy', allergy);
  }

  getAllergyById(code: string): Observable<Allergy> {
    return this.http.get<Allergy>(this.url + '/:' + code);
  }

  updateAllergy(allergy: Allergy): Observable<Allergy> {
    return this.http.put<Allergy>(this.url + '/' + allergy.code, allergy);
  }

  deleteAllergy(code: string): Observable<any> {
    return this.http.delete(this.url + '/' + code);
  }

  getFilteredAllergies(
    code?: string,
    name?: string,
    description?: string
  ): Observable<Allergy[]> {
    let params = new HttpParams();
    if (code) {
      params = params.set('code', code);
    }
    if (name) {
      params = params.set('name', name);
    }
    if (description) {
      params = params.set('description', description);
    }

    return this.http.get<Allergy[]>(this.url + '/Allergies', { params });
  }
}

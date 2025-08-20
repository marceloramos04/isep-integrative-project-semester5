import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from '../app.config';
import { map, Observable } from 'rxjs';
import { Specialization } from '../interfaces/specialization.interface';
  
@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {

  url = backendUrl + '/Specialization';

  constructor(private http: HttpClient) { }

  searchSpecializations(params: { specializationCode?: string, designation?: string, description?: string }): Observable<Specialization[]> {
    let httpParams = new HttpParams();

    if (params.specializationCode) {
      httpParams = httpParams.set('specializationCode', params.specializationCode);
    }
    if (params.designation) {
      httpParams = httpParams.set('designation', params.designation);
    }
    if (params.description) {
      httpParams = httpParams.set('description', params.description);
    }

    return this.http.get<Specialization[]>(this.url + '/search' , { params: httpParams });
  }

  createSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.post<Specialization>(this.url, specialization);
  }

  getSpecializationById(specializationCode: string): Observable<Specialization> {
    return this.http.get<Specialization>(this.url + '/' + specializationCode);
  }

  updateSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.put<Specialization>(this.url + '/' + specialization.specializationCode, specialization);
  }

  deleteSpecialization(specializationCode: string): Observable<any> {
    return this.http.delete(this.url + '/' + specializationCode);
  }
}

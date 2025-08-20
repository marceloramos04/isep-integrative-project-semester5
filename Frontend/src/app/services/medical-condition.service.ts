import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MedicalCondition } from '../interfaces/medical-condition.interface';
import appConfig from '../../../app-config.json';

@Injectable({
    providedIn: 'root'
})
export class MedicalConditionService {

    baseUrl = '';

    constructor(private http: HttpClient) {
        let backofficeUrl = appConfig['backoffice-medical-records-url'];
        this.baseUrl = `${backofficeUrl}/medical-conditions`;
    }

    searchMedicalConditions(
        code: string,
        name: string,
        description: string
    ) {
        let params = new HttpParams()
            .set('code', code)
            .set('name', name)
            .set('description', description);
        
        const url = `${this.baseUrl}/search`;
        const res = this.http.get<MedicalCondition[]>(`${url}`, { params });
        console.log(`request to ${url} returned with response:`, res);

        return res;
    }
}
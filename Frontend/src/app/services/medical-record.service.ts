import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import appConfig from '../../../app-config.json';
import { MedicalRecord } from '../interfaces/medical-record.interface';
import { MedicalCondition } from '../interfaces/medical-condition.interface';

@Injectable({
    providedIn: 'root'
})
export class MedicalRecordService {

    baseUrl = '';

    constructor(private http: HttpClient) {
        let backofficeUrl = appConfig['backoffice-medical-records-url'];
        this.baseUrl = `${backofficeUrl}/medical-records`;
    }

    updateConditions(patientId: string, conditions: MedicalCondition[]): Observable<MedicalRecord> {
        const url = `${this.baseUrl}/${patientId}/update-conditions`;
        const res = this.http.post<MedicalRecord>(url, { conditions });
        console.log(`request to ${url} returned with response:`, res);

        return res;
    }
}
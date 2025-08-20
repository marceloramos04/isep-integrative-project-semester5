import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { OperationType } from '../interfaces/operation-type.interface';
import { Observable } from 'rxjs';
import { backendUrl } from '../app.config'; 

@Injectable({
    providedIn: 'root',
})

export class OperationTypeService{

    constructor (private http: HttpClient) {}

    getOperationTypes(): Observable<OperationType[]>{
        return this.http.get<OperationType[]>(backendUrl + '/OperationType');
    }

    getSpecializations(): Observable<string[]>{
        return this.http.get<string[]>(`${backendUrl}/OperationType/specializations`);
    }
    
    getStatuses(): Observable<string[]>{
        return this.http.get<string[]>(`${backendUrl}/OperationType/statuses`);
    }

    getRoles(): Observable<string[]>{
        return this.http.get<string[]>(`${backendUrl}/OperationType/roles`);
    }

    getFilteredOperationTypes(
        name: string,
        specialization: string,
        status: boolean
    ): Observable<OperationType[]>{
        let params = new HttpParams();
        params = params.set('name', name);
        params = params.set('specialization', specialization);
        params = params.set('status', status);
        console.log(params);
        return this.http.get<OperationType[]>(backendUrl + '/OperationType/search', { params });
    }

    getOperationTypeById(id: number): Observable<OperationType>{
        return this.http.get<OperationType>(`${backendUrl}/OperationType/${id}`);
    }

    editOperationType(operationType: OperationType): Observable<OperationType>{
        return this.http.put<OperationType>(`${backendUrl}/OperationType/${operationType.id}`, operationType);
    }

    deactivateOperationType(id: number): Observable<OperationType>{
        return this.http.delete<OperationType>(`${backendUrl}/OperationType/${id}`);
    }

    addOperationType(operationType: OperationType): Observable<OperationType>{
        return this.http.post<OperationType>(`${backendUrl}/OperationType`, operationType);
    }
}
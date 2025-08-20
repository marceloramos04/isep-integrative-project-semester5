import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { OperationRequest } from '../interfaces/operation-request.interface';
import { Observable } from 'rxjs';
import { backendUrl } from '../app.config'; 

const OPERATION_REQUESTS='/OperationRequest';
const STATUSES='/statuses';
const PRIORITIES='/priorities';

@Injectable({
    providedIn: 'root',
})
export class OperationRequestService{

    constructor (private http: HttpClient) {}

    getOperationRequests(
        doctorId: string,
        patientName: string,        
        patientSurname: string,        
        typeId: string,
        priority: string,
        status: string,
    ): Observable<OperationRequest[]>{
        let params = new HttpParams();
        params = params.set('staffId', doctorId);
        params = params.set('patientFirstName', patientName);
        params = params.set('patientLastName', patientSurname);
        params = params.set('operationTypeId', typeId);
        params = params.set('priority', priority);
        params = params.set('status', status);
        return this.http.get<OperationRequest[]>(backendUrl + '/OperationRequest/search', { params });
    }

    getStatuses(): Observable<string[]>{
        return this.http.get<string[]>(backendUrl + OPERATION_REQUESTS + STATUSES);
    }

    getPriorities(): Observable<string[]>{
        return this.http.get<string[]>(backendUrl + OPERATION_REQUESTS + PRIORITIES);
    }

    getRequestById(id: number): Observable<OperationRequest> {
        return this.http.get<OperationRequest>(backendUrl + OPERATION_REQUESTS + '/' + id);
    }

    deleteRequest(id: number) {
        return this.http.delete<OperationRequest>(backendUrl + `${OPERATION_REQUESTS}/${id}`);
    }

    createOperationRequest(operationRequestData: OperationRequest): Observable<OperationRequest> {
        return this.http.post<OperationRequest>(backendUrl + OPERATION_REQUESTS, operationRequestData);
      }
}
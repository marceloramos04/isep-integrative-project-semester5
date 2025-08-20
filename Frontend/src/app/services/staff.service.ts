import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Staff } from '../interfaces/staff.interface';
import { map, Observable } from 'rxjs';
import { backendUrl } from '../app.config';


@Injectable({
    providedIn: 'root',
})

export class StaffService {

    url = backendUrl + '/Staff';

    constructor(private http: HttpClient) { }

    getAllStaff(): Observable<any[]> {
        return this.http.get<any[]>(this.url).pipe(
            map((staffList) =>
                staffList.map((staff) => this.transformStaff(staff)) // Transform the data
            )
        );
    }

    getStaffById(id: string): Observable<Staff> {
        return this.http.get<Staff>(`${this.url}/${id}`);
    }

    private transformStaff(staff: any): any {
        return {
            firstName: staff.firstName || '',
            lastName: staff.lastName || '',
            email: staff.email || '',
            specialization: staff.specialization || ''
        };
    }

    addStaff(staff: Staff): Observable<Staff> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        return this.http.post<Staff>(this.url, staff, options);
    }

    deactivateStaff(id: string): Observable<any> {
        return this.http.put(`${this.url}/deactivate/${id}`, {});
    }

    getSpecializations(): Observable<string[]> {
        return this.http.get<string[]>(`${this.url}/specializations`);
    }
    
}
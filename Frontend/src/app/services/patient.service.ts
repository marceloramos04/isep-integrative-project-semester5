import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient.interface';
import { map, Observable } from 'rxjs';
import { backendUrl } from '../app.config';
import { MedicalRecord } from '../interfaces/medical-record.interface';
import appConfigFile from 'app-config.json';
import { request } from 'express';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  getPatientById(patientId: any) {
    throw new Error('Method not implemented.');
  }
  url = backendUrl + '/Patient';

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      map((patients) =>
        patients.map((patient) => this.transformPatient(patient)) // Transform the data
      )
    );
  }


  getOperationTypes(): Observable<Patient[]> {
    return this.http.get<Patient[]>(backendUrl + '/patient');
  }


  getFilteredPatients(
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: boolean,
    medicalRecordNumber: string
  ): Observable<Patient[]> {
    let params = new HttpParams();
    params = params.set('firstName', firstName);
    params = params.set('LastName', lastName);
    params = params.set('email', email);
    params = params.set('dateOfBirth', dateOfBirth);
    params = params.set('medicalRecordNumber', medicalRecordNumber);
    console.log(params);
    return this.http.get<Patient[]>(backendUrl + '/Patient/search', { params });
  }

  private transformPatient(patient: any): any {
    return {
      fullName: patient.fullName.firstName.value + ' ' + patient.fullName.lastName.value || '',
      medicalRecordNumber: patient.medicalRecordNumber.value || '',
      phoneNumber: patient.phoneNumber?.number || '',
      email: patient.email?.address || '',
      dateOfBirth: patient.dateOfBirth.value || '',
      gender: patient.gender?.value || ''
    };
  }

  addPatient(patient: Patient): Observable<Patient> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<Patient>(this.url, patient, options);
  }

  updatePatient(id: string, patient: Patient): Observable<Patient> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Patient>(`${this.url}/${id}`, patient, options);
  }

  getPatientById1(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.url}/${patientId}`);
  }


  deletePatientProfile(medicalRecordNumber: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${medicalRecordNumber}`);
  }

  getMedicalRecord(patientId: string): Observable<MedicalRecord> {
    let backendUrl = appConfigFile['backoffice-medical-records-url'];
    let requestUrl = `${backendUrl}/medical-records/${patientId}`;
    let result = this.http.get<MedicalRecord>(requestUrl);
    console.log(`Requested medical record for patient ${patientId} from ${requestUrl}`, result);
    return result;
  }

}

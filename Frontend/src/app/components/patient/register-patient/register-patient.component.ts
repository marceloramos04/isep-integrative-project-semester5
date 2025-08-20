import { Component, inject, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule, Time } from '@angular/common'; // Importe o CommonModule
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { StaffService } from '../../../services/staff.service';
import { Staff } from '../../../interfaces/staff.interface';

import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
//import { TableDataSource, TableItem } from './table-datasource';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { Patient } from 'src/app/interfaces/patient.interface';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-patient',
  standalone: false,
//  imports: [ReactiveFormsModule,
//     MatInputModule,
//     MatButtonModule,
//     MatSelectModule,
//     MatRadioModule,
//     MatCardModule,
//     ReactiveFormsModule,
//     CommonModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatDatepickerModule,
//     MatFormFieldModule,
//     MatIconModule,
//     MatNativeDateModule,
//     FormsModule,
//   ],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.css'
})

export class RegisterPatientComponent {

  genders : string[] = ['Female', 'Male', 'Other'];

  private fb = inject(FormBuilder);
  patientDetails = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    email: [null, Validators.required],
    emergencyContact: [null, Validators.required],
    dateOfBirth: [null, Validators.required],
    gender: [null, Validators.required]
  });

  successMessage: string = 'Patient added successfully';  // Add a success message variable
  errorMessage: string = 'Error adding patient. Please try again later.';    // Add an error message variable

  constructor(
    private service: PatientService,
    private router: Router
  ){}


    submit() {

    if (this.patientDetails.valid) {
      const formValues = this.patientDetails.value;
      console.log('Form Submitted', formValues);

      const patient : Patient = {
        medicalRecordNumber: '',
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        phoneNumber: formValues.phoneNumber || '',
        email: formValues.email || '',
        emergencyContact: formValues.emergencyContact || '',
        dateOfBirth: formValues.dateOfBirth || '',
        gender: formValues.gender || '',
        fullName: ''
      }

      this.service.addPatient(patient).subscribe(
        response => {
          console.log('Patient added successfully', response);
          this.successMessage = 'Patient added successfully!';  // Set success message
          this.errorMessage = '';  // Clear any previous error message
          this.router.navigate([`admin-view/patient-details/${response.medicalRecordNumber}`]);  // Redirect to the newly added patient's details page
        },
        error => {
          console.error('Error adding patient', error);
          this.successMessage = '';  // Clear any previous success message
          this.errorMessage = 'Error adding patient. Please try again later.';  // Set error message
        }
      );

    }
  }

}

